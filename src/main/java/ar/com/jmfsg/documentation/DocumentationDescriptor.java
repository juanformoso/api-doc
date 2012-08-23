package ar.com.jmfsg.documentation;

import java.util.List;

import org.springframework.core.io.Resource;

/**
 * This descriptor is used to specify the documentation resource location.
 *  
 * @author jformoso
 */

public class DocumentationDescriptor {
    private Resource resource;
    private List<String> packagesToScan;
    private String modulePrefix;

    public String getModulePrefix() {
        return this.modulePrefix;
    }

    public void setModulePrefix(String modulePrefix) {
        this.modulePrefix = modulePrefix;
    }

    public Resource getResource() {
        return this.resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public List<String> getPackagesToScan() {
        return this.packagesToScan;
    }

    public void setPackagesToScan(List<String> packagesToScan) {
        this.packagesToScan = packagesToScan;
    }
}
