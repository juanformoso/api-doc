package ar.com.jmfsg.documentation.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import ar.com.jmfsg.documentation.DocumentationListener;
import ar.com.jmfsg.documentation.DocumentationLoader;
import ar.com.jmfsg.documentation.model.Method;
import ar.com.jmfsg.documentation.support.Utils;


/**
 * Controller mapping /docs/**
 *  
 * @author jformoso
 */

@Controller
public class DocumentationController
    implements InitializingBean, DocumentationListener {

    private Map<String, Map<String, Object>> documentationByGroup = new HashMap<String, Map<String, Object>>();
    private Map<String, Method> documentationByMethod = new HashMap<String, Method>();

    private ModelAndView createView(String name) {
        return new ModelAndView(name);
    }

    @RequestMapping(value = {"/", "/docs"}, method = RequestMethod.GET)
    public ModelAndView getIndex() {
        ModelAndView modelAndView = this.createView("index");
        modelAndView.addObject("controllers", this.documentationByGroup);
        modelAndView.addObject("general", this.getDocumentationLoader().getGeneral());
        modelAndView.addObject("tags", this.documentationLoader.getTags());
        return modelAndView;
    }

    @RequestMapping(value = "/docs/raw", method = RequestMethod.GET)
    public ModelAndView getRaw(HttpServletResponse response, @RequestHeader(value = "If-None-Matches", required = false) String ifNoneMatches) {
    	String Etag = String.valueOf(this.getDocumentationLoader().getRawDoc().hashCode());
    	if(ifNoneMatches != null && Etag.equals(ifNoneMatches)) {
    		response.setStatus(HttpStatus.NOT_MODIFIED.value());
    		return null;
    	}
        ModelAndView modelAndView = this.createView("rawJsonView");
        modelAndView.addObject("data", this.getDocumentationLoader().getRawDoc());
        response.addHeader("ETag", Etag);
        return modelAndView;
    }

    @RequestMapping(value = "/favicon.ico", method = RequestMethod.GET)
    public ModelAndView getFavicon() {
        return new ModelAndView(new RedirectView("/static/img/favicon.gif"));
    }

    @RequestMapping(value = "/docs/method/{method}", method = RequestMethod.GET)
    public ModelAndView getDetail(@PathVariable String method) {
        ModelAndView modelAndView = this.createView("detail");
        modelAndView.addObject("m", this.documentationByMethod.get(method));
        modelAndView.addObject("general", this.getDocumentationLoader().getGeneral());
        modelAndView.addObject("dictionary", this.getDocumentationLoader().getDictionary());
        modelAndView.addObject("tags", this.documentationLoader.getTags());
        return modelAndView;
    }

    @RequestMapping(value = "/docs/page/{name}", method = RequestMethod.GET)
    public ModelAndView getPage(@PathVariable String name) {
        ModelAndView modelAndView = this.createView(name);
        modelAndView.addObject("general", this.getDocumentationLoader().getGeneral());
        return modelAndView;
    }

    @RequestMapping(value = "/docs/jsonResult/", method = RequestMethod.GET)
    public String jsonResult(Model model) {
    	model.addAttribute("status" , "loading response...");
    	return "rawJsonView";
    }
    
    private DocumentationLoader documentationLoader;

    public void afterPropertiesSet() throws Exception {
    	documentationChanged(documentationLoader);
        this.documentationLoader.addDocumentationListener(this);
    }

    public DocumentationLoader getDocumentationLoader() {
        return this.documentationLoader;
    }

    public void setDocumentationLoader(DocumentationLoader documentationLoader) {
        this.documentationLoader = documentationLoader;
    }

	public void documentationChanged(DocumentationLoader loader) {
		Utils.normalizeDocumentationData(this.getDocumentationLoader().getDocumentation(), this.getDocumentationLoader()
	            .getGroups(), this.documentationByGroup, this.documentationByMethod);
	}
}
