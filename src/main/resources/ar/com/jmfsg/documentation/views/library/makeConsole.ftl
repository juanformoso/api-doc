<#-- Archivo con los macros para armar la consola de post -->
<#import "/library/paths.ftl" as p>

<#function postConsole divName>
	<#return createConsole(divName, 'post', 'httpConsoleJson', 'httpNewJson', 'postResult')>
</#function>

<#function putConsole divName>
	<#return createConsole(divName, 'put', 'httpConsoleJson', 'httpNewJson', 'putResult')>
</#function>

<#-- Arma la consola de post, recibe el nombre del div al cual agregar la consola -->
<#function createConsole divName methodName consoleFunction newFunction resultName>
<#local ret = ''>
<#if m.method?keys?seq_contains(methodName)>
<#local mapping = "${p.methodPath}" + "${m.method[methodName]}" >
<#local buttonName = methodName + 'Button' >
<#local ret = ret + '<div id="${divName}">' >
<#local ret = ret + '<input type="button" id="${buttonName}" class="btn" value="${methodName?capitalize} !" onclick="${consoleFunction}(\'${mapping}\', \'${methodName}\', \'${resultName}\')"/>\n' >
<#local ret = ret + '<img src="../../static/img/externalLink.png" onClick="${newFunction}(\'${mapping}\',  \'${methodName}\')" >\n' >
<#local ret = ret + '<textarea id="${methodName}TextArea"></textarea>'>
<#local ret = ret + '<div id="${resultName}"></div>' >
<#-- local ret = ret + '<div id="postResult"> <p> </p> <code id="postResultJson" class="json"></code> </div>' -->
<#local ret = ret + '</div>' >
</#if>
<#return ret>
</#function>

<#-- Creates div with body console that will be filled by codemirror's code -->
<#macro createBodyConsole >
<div id="bodyConsole" style="margin:10px 10px 10px 10px">
	<h3>Request Body</h3>
	<textarea id="consoleTextArea"></textarea>
</div>
</#macro>

<#macro createBodyResponse >
<div id="response">
	<h3>Response</h3>
	<span class="url">URL:</span><span id="url"></span>
	<div>
		<span id="status" class="badge">200</span>
	</div>
	<div>
		<a href="#" id="newWindow">Open response in new window</a>
	</div>
	<textarea id="responseTextArea"></textarea>
</div>
</#macro>

<#-- Creates form with parameters that goes on the URI of the request -->
<#macro createUriForm >
		<div id="uriForm">
			<table width="100%" style="margin-bottom:10px">
				<#if m.request.parameters??>
					<@appendParameters m.request.parameters 0 />
				</#if>
		    	<#if m.request.filters?has_content>
		        	<@appendParameters m.request.filters 0 />
		        </#if>
		        <#if m.request.options?has_content>
		        	<@appendParameters m.request.options 0 />
		        </#if>
		        <#if m.request.facets?has_content>
		        	<@appendParameters m.request.facets 0 />
		        </#if>
		        <#if m.request.paginable>
		        	<#local pageOption = [{'name': 'page'}, {'name': 'pagesize'}] />
		        	<@appendParameters pageOption 0 />
		        </#if>
		        <#if m.request.sortable?has_content>
			        <#local sortOption = [{'name': 'sort'}, {'name':'order'}] />
					<@appendParameters sortOption 0 />
		      	</#if>
			</table>
		</div>
</#macro>

<#-- Given a parameter, generates the fields in the form for itself and recursively for its children -->
<#macro appendParameters parameters indent>
	<#local space = '${createIndent(indent)}'>
	<#list parameters as p>
		<tr><td><b> ${space} ${p.name} </b>&nbsp;
		<#if p.vectorized?? && p.vectorized> <span class='vectorized' title='This parameter takes multiple values, if comma delimitted'>vectorized</span> </#if>
		</td><td style="margin-left:10px;">

		<#if (!p.isPhony?? || !p.isPhony)>
			<input type="text" id="p-${p.name}" /></td></tr>
		</#if>

		<#if p.children??>
			<#local newIndent = indent + 1>
			<@appendParameters p.children newIndent />
		</#if>
	</#list>
</#macro>

<#-- Generates the indentation space for given 'indent' level -->
<#function createIndent indent>
	<#local ret = ''>
	<#list 0..indent as i>
		<#local ret = ret + '&nbsp;' + '&nbsp;'>
	</#list>
	<#return ret>
</#function>
