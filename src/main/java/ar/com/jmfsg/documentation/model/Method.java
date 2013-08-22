package ar.com.jmfsg.documentation.model;

import java.util.List;


public class Method {
	
	/**
	 * Friendly name is used to generate the key of the documentation page. <br>
	 * It should be descriptive but short and, if possible, all in lower case.
	 */
	public String friendlyName;
	
	/**
	 * The group to which this service belongs
	 */
	public String group;
	
	/**
	 * The subgroup to which this service belongs.
	 */
	public String subGroup;
	
	/**
	 * The description of the method that will appear on the main page
	 */
	public String description;
	
	/**
	 * The description of the method that will appear on the method documentation page.<br>
	 * If the longDescription is null, the description will be used in the method documentation page 
	 */
	public String longDescription;
	
	/**
	 * Http method or methods of the service [GET|PUT|POST|DELETE|...]<br>
	 * Supports a <b>single String</b> with the Http method or a <b>Map</b> containing the method as key and the requestMapping for that method as value, for example
	 * <pre>
	 *    {
	 *       "GET" : "/service/object/{id}",
	 *       "POST" : "/service/object"
	 *    }
	 * </pre>
	 */
	public RequestMethods method;
	
	/**
	 * Method request mapping (relative to the documentation context)
	 */
	public String requestMapping;
	
	/**
	 * Order in which this method should be shown in the main documentation page.
	 */
	public int order;
	
	/**
	 * All info regarding input for the service
	 */
	public Request request;
	
	/**
	 * Wheter the expected response is a list or a single object. <br>
	 */
	public Boolean responseIsList = false;
	
	/**
	 * List of fields returned as a response item. <br>
	 * The reponse itself may be a single item or a list of items.
	 */
	public List<Field> response;
	
	/**
	 * List of fields that represents a Summary of the response.
	 */
	public List<Field> responseSummary;
	
	/**
	 * List of {@link Tag} names that should be applied to this method
	 */
	public List<String> tags;

	/**
	 * Label to show in the index page instead of the requestMapping. It's an optional value.
	 */
	public String shortName;
	
	/**
	 * Service examples.
	 */
	public List<Example> examples;

	// FREEMARKER NEEDS GETTERS
	
	public String getFriendlyName() {
		return friendlyName;
	}

	public String getGroup() {
		return group;
	}

	public String getSubGroup() {
		return subGroup;
	}

	public String getDescription() {
		return description;
	}

	public String getLongDescription() {
		return longDescription;
	}

	public RequestMethods getMethod() {
		return method;
	}

	public String getRequestMapping() {
		return requestMapping;
	}

	public int getOrder() {
		return order;
	}

	public Request getRequest() {
		return request;
	}

	public List<Field> getResponse() {
		return response;
	}

	public List<Field> getResponseSummary() {
		return responseSummary;
	}

	public List<String> getTags() {
		return tags;
	}

	public String getShortName() {
		return shortName;
	}

	public Boolean getResponseIsList() {
		return responseIsList;
	}
	
	public List<Example> getExamples() {
		return examples;
	}
}
