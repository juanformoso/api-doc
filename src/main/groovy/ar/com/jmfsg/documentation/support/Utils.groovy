package ar.com.jmfsg.documentation.support;

import net.sf.json.JSONArray
import net.sf.json.JSONObject

class Utils {

    static def methodComparator = [compare : { a,b->
            a.data.order.equals(b.data.order)? a.data.requestMapping.compareTo(b.data.requestMapping): Math.abs(a.data.order)<Math.abs(b.data.order)? -1: 1
        }] as Comparator

    public static void normalizeDocumentationData(Map<String, JSONArray> documentation, Map<String, JSONObject> groupDocs, def byGroup, def byMethod) {
        documentation.each { top ->
            top.value.each {
                it.each { data ->
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
}
