package ar.com.jmfsg.documentation.model;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class RequestMethods implements Map<String, String>{

	private Map<String, String> delegate = new HashMap<String, String>();

	public RequestMethods() {
		
	}
	
	public RequestMethods(String method) {
		delegate.put(method, null);
	}
	
	public RequestMethods(Map<String, String> methods) {
		delegate.putAll(methods);
	}
	
	public int size() {
		return delegate.size();
	}

	public boolean isEmpty() {
		return delegate.isEmpty();
	}

	public boolean containsKey(Object key) {
		return delegate.containsKey(key);
	}

	public boolean containsValue(Object value) {
		return delegate.containsValue(value);
	}

	public String get(Object key) {
		return delegate.get(key);
	}

	public String put(String key, String value) {
		return delegate.put(key, value);
	}

	public String remove(Object key) {
		return delegate.remove(key);
	}

	public void putAll(Map<? extends String, ? extends String> m) {
		delegate.putAll(m);
	}

	public void clear() {
		delegate.clear();
	}

	public Set<String> keySet() {
		return delegate.keySet();
	}

	public Collection<String> values() {
		return delegate.values();
	}

	public Set<java.util.Map.Entry<String, String>> entrySet() {
		return delegate.entrySet();
	}
	
	
}
