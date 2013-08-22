package ar.com.jmfsg.documentation.model;

import java.util.Map;

public class Example {

	
	/**
	 * Title for the example. If not defined the title will be defined from the preferredMethod. If that is not defined a method type will be chosend and used to create a title. <br>
	 */
	public String title;

	/**
	 * Object properties should have as key the same name defined in 'request.parameters', and values should all be strings. Date string parameters may use %$d notation defined in dynamicDate.js to generate dynamic dates.
	 */
	public Map<String, Object> uriParams;
	
	/**
	 * Path to json file with the body of the request. Path should be relative to 'resourcesPath'.
	 */
	public String bodyFile;

	
	// FREEMARKER NEEDS GETTERS
	
	public String getTitle() {
		return title;
	}

	public Map<String, Object> getUriParams() {
		return uriParams;
	}

	public String getBodyFile() {
		return bodyFile;
	}
	
	
}
