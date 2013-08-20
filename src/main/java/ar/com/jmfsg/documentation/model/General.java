package ar.com.jmfsg.documentation.model;

public class General {

	/**
	 * Application name as it should appear in the documentation page Header and
	 * title
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

	/**
	 * Relative path to which doc is mapped (may differ from /*)
	 */
	public String relativePath;

	/**
	 * Relative path to which methods are mapped (may differ from prefix url to documentation)
	 */
	public String methodPath;
	
	/**
	 * Relative path to which resources are mapped (may differ from prefix url to documentation)
	 */
	public String resourcesPath;

	// FREEMARKER NEEDS GETTERS (N)

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

	public String getRelativePath() {
		return relativePath;
	}

	public String getMethodPath() {
		return methodPath;
	}
	
	public String getResourcesPath() {
		return resourcesPath;
	}
}
