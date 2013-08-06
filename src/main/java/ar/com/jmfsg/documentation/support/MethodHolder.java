package ar.com.jmfsg.documentation.support;

import java.util.Map;

import ar.com.jmfsg.documentation.model.Method;

public class MethodHolder {

	public Method data;
	
	public Map support;
	
	public MethodHolder() {
		
	}
	
	public MethodHolder(Method data, Map support) {
		this.data = data;
		this.support = support;
	}
	
	//FREEMARKER NEEDS GETTERS

	public Method getData() {
		return data;
	}

	public Map getSupport() {
		return support;
	}
	
	
	
}
