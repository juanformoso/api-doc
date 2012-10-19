package ar.com.jmfsg.documentation.support;

import net.sf.json.JSONArray
import net.sf.json.JSONObject

class Utils {

    static def methodComparator = [compare : { a,b->
            a.data.order.equals(b.data.order)? obtainMethodName(a.data).compareTo(obtainMethodName(b.data)): Math.abs(a.data.order)<Math.abs(b.data.order)? -1: 1
        }] as Comparator

    public static void normalizeDocumentationData(Map<String, JSONArray> documentation, Map<String, JSONObject> groupDocs, def byGroup, def byMethod) {
        documentation.each { top ->
            top.value.each {
                it.each { data ->
					retrocompatibilityDataPreprocess(data) //This method is called to pre-process the method data in order to manage retro-copatibility
					
                    if (!byGroup.containsKey(data.value.group)) {
                        byGroup[data.value.group] = [:]
                        byGroup[data.value.group].methods = new TreeSet(methodComparator)
                        byGroup[data.value.group].subGroups = [:]
                    }

                    def byMethodKey = "${top.key}-${data.value.friendlyName}".replace(" ", "-")
                    if (data.value.subGroup) {
                        if (!byGroup[data.value.group].subGroups.containsKey(data.value.subGroup)) {
                            byGroup[data.value.group].subGroups[data.value.subGroup] = [:]
                            byGroup[data.value.group].subGroups[data.value.subGroup].methods = new TreeSet(methodComparator)
                        }

                        byGroup[data.value.group].subGroups[data.value.subGroup].methods.add([data: data.value, support: [internalMethodName: byMethodKey]])
                    }
                    else {
                        byGroup[data.value.group].methods.add([data: data.value, support: [internalMethodName: byMethodKey]])
                    }

                    byMethod[byMethodKey] = data.value
                }
            }
        }
        groupDocs.each { top ->
            top.value.each {
                byGroup[top.key][it.key] = it.value
            }
        }
    }
	
	public static void retrocompatibilityDataPreprocess(def data) {
		//method compatiblity issue, transform string into object
		if (!data.value.method) { 
			data.value.method = "get"
		}
		
		if (data.value.method instanceof String) {
			assert data.value.requestMapping, "RequestMapping should be defined as Method is a String"
			data.value.method = [ (data.value.method) : data.value.requestMapping ]
		}
	}
	
	public static String obtainMethodName(def a) {
		return (a.shortName)? a.shortName : (a.method.values() as List).first()
	}
}
