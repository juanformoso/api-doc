package ar.com.jmsfg.documentation.model;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.core.io.ClassPathResource;

public class ModelTestCaseData {

	public static String getGeneralData() {
		return getData("general.data");
	}
	
	public static String getTagsData() {
		return getData("tags.data");
	}
	
	public static String getMethodsData1() {
		return getData("methods1.data");
	}
	
	public static String getMethodsData2() {
		return getData("methods2.data");
	}
	
	public static String getPenaltyCalc() {
		return getData("penalty_calc.data");
	}
	
	private static String getData(String resourceName) {
		ClassPathResource resource = new ClassPathResource(resourceName);
		try {
			InputStreamReader inputStream = new InputStreamReader(resource.getInputStream());
			StringBuffer r = new StringBuffer();
			char[] chars = new char[1024]; 
			while( inputStream.read(chars) > 0) {
				r.append(chars);
			}
			return r.toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
	
}
