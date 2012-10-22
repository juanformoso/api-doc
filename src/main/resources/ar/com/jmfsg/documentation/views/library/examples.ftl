<#import "/library/utils.ftl" as u />
<#import "/library/paths.ftl" as p />

<#-- Agrego ejemplos -->
<#macro examples>
<#if m.examples?has_content>
	<div>
		<div id="examples" class="toggle-parent">
		    <h2>- Examples</h2>
		</div>
		<div class="toggle-child" >
		    <ul>
		    	${render_examples(m.examples)}
		</div>
	</div>
</#if>
</#macro>

<#-- Imprime los ejemplos, prepara el codigo para llenar la consola -->
<#function render_examples egs>
	<#local ret = ''>
	<#local count = 1>
	<#list egs as e>
		<#local exampleId = 'example' + count?string>
		<#local ret = ret + "<div id=${exampleId} class='example'>" >
		<#local ret = ret + '<h3> ${exampleId} </h3>' />
		<#local parameters = "[]">
		<#if e.getParams?has_content >
			<#list e.getParams?keys as k>
				<#local ret = ret + '<li><b>' + k + '</b>'>
				<#local ret = ret + ' &ndash; ' + e.getParams[k]>
				<#local ret = ret + '</li>'>
			 </#list>
			 <#local parameters = u.toJSString(e.getParams)>
		</#if>
		<#-- Muy fea la construcción de parametros, buscar alternativa -->
		<#local postFile = "\"\"">
		<#local putFile = "\"\"">
		<#if e.putFile?has_content>
			<#local postFile = u.toJSString(e.postFile)>
		</#if>
		<#if e.putFile?has_content>
			<#local putFile =  u.toJSString(e.putFile)>
		</#if>
		<#local ret = ret + "<input type='button' value='Use Example' onclick='useExample(${parameters}, ${postFile}, ${putFile}, ${u.toJSString(p.resourcesPath)})' />" >
		<#local ret = ret + "</div>" >
		<#local count = count + 1>
	</#list>
	<#return ret>
</#function>