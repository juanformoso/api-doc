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
	
	@Override
	public int size() {
		return delegate.size();
	}

	@Override
	public boolean isEmpty() {
		return delegate.isEmpty();
	}

	@Override
	public boolean containsKey(Object key) {
		return delegate.containsKey(key);
	}

	@Override
	public boolean containsValue(Object value) {
		return delegate.containsValue(value);
	}

	@Override
	public String get(Object key) {
		return delegate.get(key);
	}

	@Override
	public String put(String key, String value) {
		return delegate.put(key, value);
	}

	@Override
	public String remove(Object key) {
		return delegate.remove(key);
	}

	@Override
	public void putAll(Map<? extends String, ? extends String> m) {
		delegate.putAll(m);
	}

	@Override
	public void clear() {
		delegate.clear();
	}

	@Override
	public Set<String> keySet() {
		return delegate.keySet();
	}

	@Override
	public Collection<String> values() {
		return delegate.values();
	}

	@Override
	public Set<java.util.Map.Entry<String, String>> entrySet() {
		return delegate.entrySet();
	}
	
	
}
