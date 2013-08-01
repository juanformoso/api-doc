package ar.com.jmfsg.documentation.model;

import java.util.List;
import java.util.Map;

/**
 * The Root of the Documentation hierarchy
 * @author gvinokur
 *
 */
public class Documentation {
	
	/**
	 * General Documentation for the application
	 */
	public General general;
	
	/**
	 * List of {@link Method|methods} that are available throught this application 
	 */
	public List<Map<String,Method>> methods;
	
	/**
	 * Globally defined tags that can be applied to the methods
	 */
	public List<Tag> tags;
	
	/**
	 * Globally defined dictionary. <br>
	 * Any property defined here will have the description expanded the same way anywhere in the documentation.
	 */
	public List<DictionaryEntry> dictionary;
	
}
