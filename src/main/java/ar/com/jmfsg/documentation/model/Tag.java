package ar.com.jmfsg.documentation.model;

public class Tag {
	
	/**
	 * The name of the tag, this is used both for referencing the tag to use it, and to show to the end user in the documentation
	 */
	public String name;
	
	/**
	 * HTML Background color for the tag.
	 */
	public String color;
	
	/**
	 * Long description for what the tag means.<br>
	 * It will be shown on hovering over the tag.
	 */
	public String title;

	// FREEMARKER NEEDS GETTERS
	
	public String getName() {
		return name;
	}

	public String getColor() {
		return color;
	}

	public String getTitle() {
		return title;
	}
	
	
}
