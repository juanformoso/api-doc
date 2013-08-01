package ar.com.jmfsg.documentation.model;

import java.util.List;

public class Request {

	/**
	 * Whether the method is paginable, if true, it will automatically add the required fields.
	 */
	public boolean paginable = false;
	
	/**
	 * Whether it is sortable or not and by which fields it can be sorted.
	 */
	public Sortable sortable;
	
	/**
	 * Method request parameters.
	 */
	public List<Field> parameters;
	
	/**
	 * Options that modify the response.
	 */
	public List<Field> options;
	
	/**
	 * Service filters
	 */
	public List<Field> filters;
	
	/**
	 * Service Facets.<br>
	 * A Facet is like a filter, but they are returned with the service with a count that represents the amount of items that will
	 * be returned once the facet is applied.
	 */
	public List<Field> facets;
}
