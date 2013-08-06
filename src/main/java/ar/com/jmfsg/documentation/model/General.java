package ar.com.jmfsg.documentation.model;

public class General {
	
	/**
	 * Application name as it should appear in the documentation page Header and title
	 */
	public String projectName;
	
	/**
	 * Main application description
	 */
	public String longDescription;
	
	/**
	 * Technical summary of the application, if needed.
	 */
	public String projectSummary;
	
	/**
	 * Technical summary of the methods.
	 */
	public String methodSummary;
	
	/**
	 * If avaiable, twitter username to set in the documentation page.
	 */
	public String twitterUsername;
	
	/**
	 * Header Image url. Should be a url relative to the project's main context.
	 */
	public String headerImageUrl;
	
	public String headerImageSize;

	
	//FREEMARKER NEEDS GETTERS (N)
	
	public String getProjectName() {
		return projectName;
	}

	public String getLongDescription() {
		return longDescription;
	}

	public String getProjectSummary() {
		return projectSummary;
	}

	public String getMethodSummary() {
		return methodSummary;
	}

	public String getTwitterUsername() {
		return twitterUsername;
	}

	public String getHeaderImageUrl() {
		return headerImageUrl;
	}

	public String getHeaderImageSize() {
		return headerImageSize;
	}

	
}
