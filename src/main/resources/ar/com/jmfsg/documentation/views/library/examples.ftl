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
	<#list egs as e>
		<#local count = 1>
		<#local exampleId = 'example' + count?string>
		<#local ret = ret + "<div id=${exampleId} class='example'>" >
		<#local ret = ret + '<h3> ${exampleId} </h3>' />
		<#list e.getParams?keys as k>
			<#local ret = ret + '<li><b>' + k + '</b>'>
			<#local ret = ret + ' &ndash; ' + e.getParams[k]>
			<#local ret = ret + '</li>'>
		 </#list>
		<#-- Muy fea la construcción de parametros, buscar alternativa -->
		<#local parameters = u.toJSString(e.getParams)>
		<#local postFile = e.postFile?has_content?string(u.toJSString(e.postFile), "")>
		<#local ret = ret + "<input type='button' value='Use Example' onclick='useExample(${parameters}, ${postFile}, ${u.toJSString(p.resourcesPath)})' />" >
		<#local ret = ret + "</div>" >
		<#local count = count + 1>
	</#list>
	<#return ret>
</#function>