package ar.com.jmfsg.documentation;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;
import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import ar.com.jmfsg.documentation.annotation.Documented;
import ar.com.jmfsg.documentation.model.DictionaryEntry;
import ar.com.jmfsg.documentation.model.Documentation;
import ar.com.jmfsg.documentation.model.Field;
import ar.com.jmfsg.documentation.model.General;
import ar.com.jmfsg.documentation.model.Group;
import ar.com.jmfsg.documentation.model.Method;
import ar.com.jmfsg.documentation.model.Request;
import ar.com.jmfsg.documentation.model.RequestMethods;
import ar.com.jmfsg.documentation.model.Tag;

/**
 * Loads all {@link DocumentationDescriptor} with the actual documentation
 * information.
 * 
 * @author jformoso
 */

public class DocumentationLoader implements InitializingBean,
		ApplicationContextAware {
	private General general = new General();
	private Map<String, String> dictionary = new HashMap<String, String>();
	private Map<String, Tag> tags = new HashMap<String, Tag>();
	private Map<String, List<Method>> methodsByModule = new HashMap<String, List<Method>>();
	private Map<String, Group> groups = new HashMap<String, Group>();

	private JSONObject rawDoc;

	private Map<String, DocumentationDescriptor> documentationDescriptors = new HashMap<String, DocumentationDescriptor>();

	private ObjectMapper objectMapper = new ObjectMapper();

	private List<DocumentationListener> listeners = new LinkedList<DocumentationListener>();

	{
		objectMapper
				.configure(
						DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,
						false);
		objectMapper.setSerializationInclusion(Inclusion.NON_NULL);
		
	}

	public List<Method> getDocumentationForModule(String prefix) {
		return this.methodsByModule.get(prefix);
	}

	public Map<String, List<Method>> getDocumentation() {
		return this.methodsByModule;
	}

	public boolean hasDocumentationDescriptor(String beanName) {
		return documentationDescriptors.containsKey(beanName);
	}

	public void addDocumentationDescriptor(String beanName,
			DocumentationDescriptor documentationDescriptor) {
		this.documentationDescriptors.put(beanName, documentationDescriptor);
	}

	public void setApplicationContext(ApplicationContext ctx)
			throws BeansException {
		String[] beanNamesForType = ctx
				.getBeanNamesForType(DocumentationDescriptor.class);
		for (String beanName : beanNamesForType) {
			this.addDocumentationDescriptor(beanName,
					(DocumentationDescriptor) ctx.getBean(beanName));
		}
	}

	public void afterPropertiesSet() throws Exception {

		this.general = new General();
		this.dictionary = new HashMap<String, String>();
		this.dictionary = new HashMap<String, String>();
		this.tags = new HashMap<String, Tag>();
		this.methodsByModule = new HashMap<String, List<Method>>();
		this.groups = new HashMap<String, Group>();
		this.rawDoc = null;

		for (DocumentationDescriptor d : documentationDescriptors.values()) {
			JSONObject doc = this.readDoc(d.getResource());

			String modulePrefix = StringUtils.isEmpty(d.getModulePrefix()) ? ""
					: d.getModulePrefix();
			appendRaw(doc);

			Documentation documentation = objectMapper.readValue(
					doc.toString(), Documentation.class);

			this.addToGeneral(documentation.general);

			this.addToDictionary(documentation.dictionary);

			this.addToGroupDocs(documentation.groups);

			this.addToTags(documentation.tags);

			this.addModuleMethods(modulePrefix, documentation.methods);

			// Check if there are complements via annotations
			if (d.getPackagesToScan() != null) {
				for (String pack : d.getPackagesToScan()) {
					Reflections reflections = new Reflections(
							new ConfigurationBuilder()
									.setUrls(ClasspathHelper.forPackage(pack))
									.setScanners(new MethodAnnotationsScanner()));

					Set<java.lang.reflect.Method> annotated = reflections
							.getMethodsAnnotatedWith(ar.com.jmfsg.documentation.annotation.Documentation.class);

					Iterator<java.lang.reflect.Method> it = annotated
							.iterator();

					while (it.hasNext()) {
						java.lang.reflect.Method m = it.next();
						JSONObject o = JSONObject
								.fromObject(m
										.getAnnotation(
												ar.com.jmfsg.documentation.annotation.Documentation.class)
										.data());

						Method method = objectMapper.readValue(o.toString(),Method.class);
						this.addModuleMethod(modulePrefix, method);
					}
					
					processDocumentedAnnotation(modulePrefix, reflections);
				}
			}
		}
		for (DocumentationListener listener : listeners) {
			listener.documentationChanged(this);
		}
	}

	/**
	 * process {@link Documented} annotation
	 */
	private void processDocumentedAnnotation(String modulePrefix,
			Reflections reflections) {
		Set<java.lang.reflect.Method> annotated;
		Iterator<java.lang.reflect.Method> it;
		annotated = reflections.getMethodsAnnotatedWith(Documented.class);
		it = annotated.iterator();
		while (it.hasNext()) {
			java.lang.reflect.Method m = it.next();
			Documented annotation = m.getAnnotation(Documented.class);

			Method method = new Method();
			// try to infer some data from the request mapping annotation
			RequestMapping mappingRequested = m.getAnnotation(RequestMapping.class);
			if (mappingRequested != null){
				method.requestMapping = m.getName();
				Map<String,String> methodMap = Maps.newHashMap();
				for (int i = 0; i < mappingRequested.value().length; i++) {
					for (int j = 0; j < mappingRequested.method().length; j++) {
						methodMap.put(mappingRequested.method()[j].name(), mappingRequested.value()[i]);
					}
				}
				method.method = new RequestMethods(methodMap);
				method.order = 1;
				method.friendlyName = StringUtils.isEmpty(annotation.friendlyName())?m.getName():annotation.friendlyName();
				method.group = annotation.group();
				method.longDescription = annotation.longDescription();
				method.subGroup = annotation.subgroup();
				method.description = annotation.description();
				
				if (!ArrayUtils.isEmpty(annotation.parameterNames())){
					method.request = new Request();
					method.request.parameters = Lists.newArrayList();
					for (String name : annotation.parameterNames()) {
						Field field = new Field();
						field.name = name;
						method.request.parameters.add(field);
					}
				}
			}
			this.addModuleMethod(modulePrefix, method);
		}
	}

	private void addModuleMethod(String modulePrefix, Method method) {
		if(method!=null ) {
			if(!this.methodsByModule.containsKey(modulePrefix)) {
				this.methodsByModule.put(modulePrefix, new LinkedList<Method>());
			}
			List<Method> moduleMethods = this.methodsByModule.get(modulePrefix);
			moduleMethods.add(method);
		}
	}

	private void addModuleMethods(String modulePrefix,
			List<Map<String, Method>> methods) {
		if(methods != null) {
			if(!this.methodsByModule.containsKey(modulePrefix)) {
				this.methodsByModule.put(modulePrefix, new LinkedList<Method>());
			}
			List<Method> moduleMethods = this.methodsByModule.get(modulePrefix);
			for (Map<String, Method> methodMap : methods) {
				moduleMethods.addAll(methodMap.values());	
			}
		}
	}

	private void addToGeneral(General general) {
		if (general != null) {
			if (general.headerImageUrl != null) {
				this.general.headerImageUrl = general.headerImageUrl;
			}
			if (general.headerImageSize != null) {
				this.general.headerImageSize = general.headerImageSize;
			}
			if (general.longDescription != null) {
				this.general.longDescription = general.longDescription;
			}
			if (general.methodSummary != null) {
				this.general.methodSummary = general.methodSummary;
			}
			if (general.projectName != null) {
				this.general.projectName = general.projectName;
			}
			if (general.projectSummary != null) {
				this.general.projectSummary = general.projectSummary;
			}
			if (general.twitterUsername != null) {
				this.general.twitterUsername = general.twitterUsername;
			}
			if (general.relativePath != null) {
				this.general.relativePath = general.relativePath;
			}
			if (general.resourcesPath != null) {
				this.general.resourcesPath  = general.resourcesPath ;
			}
			if (general.methodPath != null) {
				this.general.methodPath = general.methodPath;
			}
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

	private void addToGroupDocs(List<Map<String, Group>> groups) {
		if (groups != null) {
			for (Map<String, Group> map : groups) {
				this.groups.putAll(map);
			}
		}
	}

	private void addToDictionary(List<DictionaryEntry> dictionary) {
		if (dictionary != null) {
			for (DictionaryEntry dictionaryEntry : dictionary) {
				this.getDictionary().put(dictionaryEntry.key,
						dictionaryEntry.description);
			}
		}
	}

	private void addToTags(List<Tag> tags) {
		if (tags != null) {
			for (Tag tag : tags) {
				this.tags.put(tag.name, tag);
			}
		}
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

	public General getGeneral() {
		return this.general;
	}

	public JSONObject getRawDoc() {
		return this.rawDoc;
	}

	public Map<String, String> getDictionary() {
		return this.dictionary;
	}

	public Map<String, Group> getGroups() {
		return this.groups;
	}

	public Map<String, Tag> getTags() {
		return tags;
	}

	public void addDocumentationListener(DocumentationListener listener) {
		this.listeners.add(listener);
	}

}
