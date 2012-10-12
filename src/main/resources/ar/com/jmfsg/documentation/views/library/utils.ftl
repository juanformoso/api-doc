<#import "paths.ftl" as p />

<#-- Funcion para convertir valores Freemarker a string de js (soporta scalares, collection, sequence y extended hashes) -->
<#function toJSString obj>
	<#local ret = ''>
	<#if obj?is_string>
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
 <#macro indexPageMethodIndex method support>
 			<#if method.friendlyName == "">
	    		<li>${method.method?values?first}
	    	<#else>
		        <li><a href="${p.relativePath + '/docs/method/' + support.internalMethodName}">${method.method?values?first?replace(":.+", "")}</a>
		    </#if>
		    <sub><sub><b>
    			[ <#list method.method?keys as k> ${k?lower_case} </#list> ]
    		</b></sub></sub><#if method.implemented?has_content && !method.implemented><span class="not-implemented" title="This method is not currently implemented but will be included in a future release. Parameters and responses are subject to change in the final version.">not implemented</span></#if> &ndash; ${method.description}</li>
 </#macro>
 