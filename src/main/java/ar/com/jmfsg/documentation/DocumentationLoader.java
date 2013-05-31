package ar.com.jmfsg.documentation;

import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;

import ar.com.jmfsg.documentation.annotation.Documentation;

/**
 * Loads all {@link DocumentationDescriptor} with the actual documentation
 * information.
 * 
 * @author jformoso
 */

public class DocumentationLoader implements InitializingBean,
		ApplicationContextAware {
	private Map<String, JSONArray> docByModule;
	private Map<String, String> dictionary = new HashMap<String, String>();
	private Map<String, JSONObject> tags = new HashMap<String, JSONObject>();
	private Map<String, JSONObject> groupDocs = new HashMap<String, JSONObject>();
	private JSONObject generalDoc = new JSONObject();
	private JSONObject rawDoc;

	private Map<String, DocumentationDescriptor> documentationDescriptors = new HashMap<String, DocumentationDescriptor>();

	private List<DocumentationListener> listeners = new LinkedList<DocumentationListener>();
	
	public JSONArray getDocumentationForModule(String prefix) {
		return this.docByModule.get(prefix);
	}

	public Map<String, JSONArray> getDocumentation() {
		return this.docByModule;
	}

	public boolean hasDocumentationDescriptor(String beanName) {
		return documentationDescriptors.containsKey(beanName);
	}

	public void addDocumentationDescriptor(String beanName,
			DocumentationDescriptor documentationDescriptor) {
		this.documentationDescriptors.put(beanName, documentationDescriptor);
	}

	@Override
	public void setApplicationContext(ApplicationContext ctx)
			throws BeansException {
		String[] beanNamesForType = ctx
				.getBeanNamesForType(DocumentationDescriptor.class);
		for (String beanName : beanNamesForType) {
			this.addDocumentationDescriptor(beanName, (DocumentationDescriptor) ctx.getBean(beanName));
		}
	}

	@Override
	public void afterPropertiesSet() throws Exception {

		this.docByModule = new HashMap<String, JSONArray>();
		this.dictionary = new HashMap<String, String>();
		this.tags = new HashMap<String, JSONObject>();
		this.groupDocs = new HashMap<String, JSONObject>();
		this.generalDoc = new JSONObject();
		this.rawDoc = null;
		
		for (DocumentationDescriptor d : documentationDescriptors.values()) {
			JSONObject doc = this.readDoc(d.getResource());

			String modulePrefix = StringUtils.isEmpty(d.getModulePrefix()) ? ""
					: d.getModulePrefix();
			appendRaw(doc);
			if (doc.has("general")) {
				this.getGeneralDoc()
						.accumulateAll(doc.getJSONObject("general"));
			}

			if (doc.has("dictionary")) {
				this.addToDictionary(doc.getJSONArray("dictionary"));
			}

			if (doc.has("groups")) {
				this.addToGroupDocs(doc.getJSONObject("groups"));
			}

			if (doc.has("tags")) {
				this.addToTags(doc.getJSONArray("tags"));
			}

			if (doc.has("methods")) {
				if (this.docByModule.containsKey(d.getModulePrefix())) {
					this.docByModule.get(modulePrefix).addAll(
							doc.getJSONArray("methods"));
				} else {
					this.docByModule.put(modulePrefix,
							doc.getJSONArray("methods"));
				}
			}

			// Check if there are complements via annotations
			if (d.getPackagesToScan() != null) {
				for (String pack : d.getPackagesToScan()) {
					Reflections reflections = new Reflections(
							new ConfigurationBuilder()
									.setUrls(ClasspathHelper.forPackage(pack))
									.setScanners(new MethodAnnotationsScanner()));

					Set<Method> annotated = reflections
							.getMethodsAnnotatedWith(Documentation.class);

					Iterator<Method> it = annotated.iterator();

					while (it.hasNext()) {
						Method m = it.next();
						JSONObject o = JSONObject.fromObject(m.getAnnotation(
								Documentation.class).data());

						JSONObject original = this
								.getObjectLoadedFromResource(
										this.docByModule.get(modulePrefix),
										m.getName());

						if (original != null) {
							original.accumulateAll(o);
						} else {
							this.docByModule.get(modulePrefix).add(o);
						}
					}
				}
			}
		}
		for (DocumentationListener listener : listeners) {
			listener.documentationChanged(this);
		}
	}

	private void appendRaw(JSONObject doc) {
		if (this.rawDoc == null) {
			this.rawDoc = new JSONObject();
		}
		mergeJSONObjects(this.rawDoc, doc);

	}

	private void mergeJSONObjects(JSONObject rawDoc, JSONObject doc) {
		Set<String> updateKeys = doc.keySet();
		for (String key : updateKeys) {
			if (rawDoc.containsKey(key)) {
				Object object = rawDoc.get(key);
				if (object instanceof JSONObject
						&& !((JSONObject) object).isNullObject()) {
					mergeJSONObjects((JSONObject) object,
							doc.getJSONObject(key));
				} else if (object instanceof JSONArray) {
					((JSONArray) object).addAll(doc.getJSONArray(key));
				} else {
					// TODO: Define strategy for regular objects, for now, last
					// is accepted
					rawDoc.put(key, doc.get(key));
				}
			} else {
				rawDoc.put(key, doc.get(key));
			}
		}
	}

	private void addToGroupDocs(JSONObject jsonObject) {
		for (Object group : jsonObject.keySet()) {
			JSONObject doc = (JSONObject) jsonObject.get(group);
			this.groupDocs.put((String) group, doc);
		}
	}

	private void addToDictionary(JSONArray jsonArray) {
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject o = (JSONObject) jsonArray.get(i);
			if (o.has("key") && o.has("description")) {
				this.getDictionary().put(o.getString("key"),
						o.getString("description"));
			}
		}
	}

	private void addToTags(JSONArray jsonArray) {
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject o = (JSONObject) jsonArray.get(i);
			if (o.has("name") && o.has("color")) {
				this.getTags().put(o.getString("name"), o);
			}
		}
	}

	private JSONObject getObjectLoadedFromResource(JSONArray jsonArray,
			String name) {
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject o = (JSONObject) jsonArray.get(i);
			if (o.has(name)) {
				return o.getJSONObject(name);
			}
		}

		return null;
	}

	private JSONObject readDoc(Resource r) throws IOException,
			URISyntaxException {
		return JSONObject.fromObject(readAll(r));
	}

	public static String readAll(Resource res) throws java.io.IOException {
		java.io.InputStream s = null;
		java.io.InputStreamReader r = null;
		StringBuilder content = new StringBuilder();
		try {
			s = res.getInputStream();

			r = new java.io.InputStreamReader(s);

			char[] buffer = new char[4 * 1024];
			int n = 0;
			while (n >= 0) {
				n = r.read(buffer, 0, buffer.length);
				if (n > 0) {
					content.append(buffer, 0, n);
				}
			}
		} finally {
			if (r != null) {
				r.close();
			}
			if (s != null) {
				s.close();
			}
		}
		return content.toString();
	}

	public JSONObject getGeneralDoc() {
		return this.generalDoc;
	}

	public JSONObject getRawDoc() {
		return this.rawDoc;
	}

	public Map<String, String> getDictionary() {
		return this.dictionary;
	}

	public Map<String, JSONObject> getGroupDocs() {
		return this.groupDocs;
	}

	public Map<String, JSONObject> getTags() {
		return tags;
	}
	
	public void addDocumentationListener(DocumentationListener listener) {
		this.listeners.add(listener);
	}

}
