package ar.com.jmfsg.documentation.model;

import java.util.List;

public class Field {

	/**
	 * The name of the field
	 */
	public String name;
	
	/**
	 * Description that will be shown in the method documentation page
	 */
	public String description;
	
	/**
	 * The type of the method.
	 */
	public String type;
	
	/**
	 * Only valid for parameters. <br>
	 * Whether it accepts a vectorized parameter.<br>
	 * In case it is true, a comma separated list of values can be send.
	 */
	public Boolean vectorized = false;
	
	/**
	 * Only valid for options and filters.<br>
	 * The value that is taken by default if none sent.
	 */
	public String defaultValue;
	
	/**
	 * If it has children, wether the object returned is a list or a sinlge item. <br>
	 * This element is only valid for responses and post/put request parameters
	 */
	public Boolean isList = false;
	
	
	/**
	 * Sub elements of this field. <br>
	 * This element is only valid for responses and post/put request parameters
	 */
	public List<Field> children;


	//FREEMARKER NEEDS GETTERS
	
	public String getName() {
		return name;
	}


	public String getDescription() {
		return description;
	}


	public String getType() {
		return type;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public List<Field> getChildren() {
		return children;
	}


	public Boolean getVectorized() {
		return vectorized;
	}


	public Boolean getIsList() {
		return isList;
	}
}
