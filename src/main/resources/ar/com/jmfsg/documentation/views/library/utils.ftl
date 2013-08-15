<#import "paths.ftl" as p />

<#-- Funcion para convertir valores Freemarker a string de js (soporta scalares, collection, sequence y extended hashes) -->
<#function toJSString obj>
	<#local ret = ''>
	<#if obj?is_hash_ex && obj.name?has_content> //it's a Field object
		<#local ret = ret + "{ \"name\" : \"" + obj.name?js_string + "\"">
		<#if obj.children?has_content> //We also need it's children
			<#local ret = ret + ", \"children\" : " + toJSString(obj.children)  >
		</#if>
		<#local ret = ret + "}">
	<#elseif obj?is_string>
		<#local ret = ret + "\"" + obj?js_string + "\"">
	<#elseif obj?is_number || obj?is_boolean || obj?is_date >
		<#local ret = ret + "\"" + obj?string?js_string + "\"">
	<#elseif obj?is_hash_ex>
		<#local ret = ret + hashToJSString(obj)>
	<#elseif obj?is_sequence || obj?is_collection>
		<#local ret = ret + seqToJSString(obj)>
	</#if>
	<#return ret>
</#function>


<#-- Funcion que convierte un SimpleHash con valores escalares de freemarker a un string de js -->
<#function hashToJSString hash>
<#local ret = '{'>
	<#list hash?keys as k>
		<#local ret = ret + ' \"' + k + '\" :'>
		<#local ret = ret + toJSString(hash[k])>
		<#local ret = ret + ', '>
    </#list>
<#local ret = ret + '}'>
<#return ret>
</#function>

<#-- Funcion que convierte un Collection o Sequence a string de js -->
<#function seqToJSString obj>
<#local ret = '['>
	<#list obj as e>
		<#local ret = ret + toJSString(e)>
		<#local ret = ret + ', '>
    </#list>
<#local ret = ret + ']'>
<#return ret>
</#function>

<#-- Funcion que renderiza un objeto JSON -->
<#function render_object col>
	<#local ret = ''>
	<#list col as c>
		<#local ret = ret + '<li><b>' + c.name + '</b>'>
		<#if c.isList?has_content && c.isList>
			<#local ret = ret + ' &ndash; <i>List</i>'>
		</#if>
		<#local description = resolve_description(c) >
		<#if description?has_content>
			<#local ret = ret + ' &ndash; ' + description>
		</#if>
		<#if c.type?has_content>
			<#local ret = ret + ' &ndash; <i>' + c.type + '</i>'>
		</#if>
		<#if c.optional?has_content>
			<#local ret = ret + ' &ndash; <i>Optional</i>.'>
		</#if>
		<#if c.vectorized?has_content && c.vectorized>
			<ul><li>This is a <b>vectorized parameter</b>, multiple ids can be sent in a single request if delimitted with a comma string.</li></ul>
		</#if>
		<#if c.children?has_content>
			<#local ret = ret + '<ul>' + render_object(c.children) + '</ul>' >	
		</#if>
		<#local ret = ret + '</li>'>
	</#list>
    <#return ret>
 </#function>
 
 <#-- -->
 <#function resolve_description field>
 	
 	<#local ret = ''>
 	
 	<#if field.description?has_content>
 		<#local ret = field.description >
 	<#elseif field.descriptionKey?has_content && dictionary?keys?seq_contains(field.descriptionKey)>
 		<#local ret = dictionary[field.descriptionKey] >
 	<#elseif dictionary?keys?seq_contains(field.name)>
 		<#local ret = dictionary[field.name]>
 	</#if>
 	
 	<#return ret>
 </#function>
 
 <#-- Macro to get a method item for the index page -->
 <#macro indexPageMethodIndex method support tagsClass>
    		<li class="service-row">
    			<div class="service-methods"><sub><sub><b>[ <#list method.method?keys as k> ${k?lower_case} </#list> ]</b></sub></sub></div>    			
    			<#if method.shortName?has_content>
    				<div class="service-url" title="${method.shortName}">
	 					<a href="${p.relativePath + '/docs/method/' + support.internalMethodName}">${method.shortName}</a>
	 				</div>
	 			<#elseif method.friendlyName == "">
	 				<div class="service-url" title="${method.method?values?first}">
		    			${method.method?values?first}
		    		</div>
		    	<#else>
		    		<#if method.preferredMethod?has_content && method.method?keys?seq_contains(method.preferredMethod) >
		    			<#local preferredMethod =  method.method[method.preferredMethod] >
		    		<#else>
		    			<#local preferredMethod =  method.method?values?first >
		    		</#if>	
		    		<div class="service-url" title="${preferredMethod?replace(":.+", "")}">
			        	<a href="${p.relativePath + '/docs/method/' + support.internalMethodName}">${preferredMethod?replace(":.+", "")}</a>
			        </div>
			    </#if>    				
    			
    			<div class="service-description">${method.description}</div>
    			<div class="service-tags">
    				<#if method.tags?has_content>${renderTags(method.tags, tagsClass)}</#if>
    				<#if method.implemented?has_content && !method.implemented><span class="not-implemented" title="This method is not currently implemented but will be included in a future release. Parameters and responses are subject to change in the final version.">not implemented</span></#if>
    			</div>
    			<div style="clear: both;">
    		</li>
    		
 </#macro>
 
 <#-- Function that gets parameters names from the list and their children recursively -->
 <#function obtainAllParams objs>
 	<#local ret = '['>
 	<#local ret = ret + obtainAllParamsAux(objs)>
 	<#local ret = ret + ']'>
 	<#return ret>
 </#function>
 
 <#function obtainAllParamsAux objs>
 	<#local ret = ''>
 	<#list objs as o>
 		<#local ret = ret + '\'' + o.name + '\', '>
 		<#if o.children?has_content>
 			<#local ret = ret + obtainAllParamsAux(o.children)>
 		</#if>
 	</#list>
 	<#return ret>
 </#function>
 
<#-- Function render tags extracted from utils and index -->
 <#function renderTags methodTags class>
	<#local ret = ''>
 	
 	<#list methodTags as tag>
 		<#if tags?has_content && tags?keys?seq_contains(tag)>
 			<#local ret = ret + '<span class="' + class + '" title="' + tags[tag].title +'" style="background-color:' + tags[tag].color +'">' + tags[tag].name + '</span>'>
 		<#else>
 			<#local ret = ret + '<span class="'+ class + '" title="' + tag +'" style="background-color:#EEEEEE">' + tag + '</span>'>
 		</#if>
 	</#list> 	
 	
 	<#return ret>
 </#function>