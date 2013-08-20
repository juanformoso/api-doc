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
		    	${render_examples(m.examples, m)}
		</div>
	</div>
</#if>
</#macro>

<#-- Imprime los ejemplos, prepara el codigo para llenar la consola -->
<#function render_examples egs method>
	<#local ret = ''>
	<#local count = 1>
	<#list egs as e>
		<#local exampleId = '+ #' + count?string + " - " + example_title(e, method) + " - ">
		<#local ret = ret + "<div id=${exampleId} class='example'> <div class='toggle-parent' closed='true'>" >
		<#local ret = ret + "<h4> <div style='float:left'> ${exampleId} </div>" >
		
		<#local parameters = "[]">
		<#if e.uriParams?has_content >
			<#local parameters = u.toJSString(e.uriParams)>
		</#if>
		
		<#-- Muy fea la construcción de parametros, buscar alternativa -->
		<#local bodyFile = "\"\"">
		<#if e.bodyFile?has_content>
			<#local bodyFile = u.toJSString(e.bodyFile)>
		</#if>
		
		<#if m.preferredMethod?has_content>
			<#local preferredMethod = m.preferredMethod >
		<#else>
			<#local preferredMethod = m.method?keys?first>
		</#if>
		<#local mapping = "${p.methodPath}" + "${m.method[preferredMethod]}" >
		<#local ret2>
				<div style='float:right;margin-right:1%'> 
					<a href='#consoles'>
						<img src='../../static/img/terminal_icon1.png' style='vertical-align:middle; height:25px' onclick='consoleBehaviour.useExample(${parameters}, ${bodyFile}, ${u.toJSString(p.resourcesPath)})' />
					</a>
					<img src='../../static/img/externalLink.png' style='vertical-align:middle;' onclick='execute_example("${mapping}", "${preferredMethod}", ${u.toJSString(e.uriParams!"")}, ${u.toJSString(e.bodyFile!"")}, ${u.toJSString(p.resourcesPath)})'>
			 	</div>
				<div style='clear:both'> </div>
			</h4>
			</div>
		</#local>
		<#local ret = ret + ret2>
		
		<#local ret = ret + "<div class='toggle-child' style='margin-left:2.5%; margin-bottom:2.5%' >" >
		<#if e.uriParams?has_content >
			<#list e.uriParams?keys as k>
				<#local ret = ret + '<li><b>' + k + '</b>'>
				<#local ret = ret + ' &ndash; ' + e.uriParams[k]>
				<#local ret = ret + '</li>'>
			 </#list>
			 
		</#if>
		
		<#local ret = ret + "<input type='button' value='Use Example' onclick='useExample(${parameters}, ${bodyFile}, ${u.toJSString(p.resourcesPath)})' />" >
		<#local ret = ret + "</div>" >
		<#local ret = ret + "</div>" >
		<#local count = count + 1>
	</#list>
	<#return ret>
</#function>

<#function example_title example method>
	<#if example.title?has_content> <#-- Si el ejemplo tiene título -->
		<#return example.title>
	<#else>
		<#local methodType = method.method?keys?first>
		<#if method.preferredMethod?has_content>  <#-- Si hay un método preferido -->
			<#local methodType = method.preferredMethod >
		</#if>
		<#-- Según el método devuelvo la descripción automática -->
		<#if methodType?lower_case == "get">
			<#local getInfo = "">
			<#if example.uriParams?has_content >
				<#list example.uriParams?keys as k>
					<#local getInfo = getInfo + "${example.uriParams[k]}" + "/" > 
				</#list>
			</#if>
			<#return getInfo>
		<#elseif methodType?lower_case == "post" || methodType?lower_case == "put">
			<#if example.bodyFile?has_content>
				<#return example.bodyFile>
			</#if>
		</#if>
	</#if>
	
	<#return "">
</#function>