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
		<#local exampleId = '+ #' + count?string>
		<#local ret = ret + "<div id=${exampleId} class='example'> <div class='toggle-parent' closed='true'>" >
		<#local ret = ret + "<h4> <div style='float:left'> ${exampleId} </div>" >
		
		<#local parameters = "[]">
		<#if e.getParams?has_content >
			<#local parameters = u.toJSString(e.getParams)>
		</#if>
		
		<#-- Muy fea la construcción de parametros, buscar alternativa -->
		<#local postFile = "\"\"">
		<#local putFile = "\"\"">
		<#if e.postFile?has_content>
			<#local postFile = u.toJSString(e.postFile)>
		</#if>
		<#if e.putFile?has_content>
			<#local putFile =  u.toJSString(e.putFile)>
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
						<img src='../../static/img/terminal_icon1.png' style='vertical-align:middle; height:25px' onclick='useExample(${parameters}, ${postFile}, ${putFile}, ${u.toJSString(p.resourcesPath)})' />
					</a>
					<img src='../../static/img/externalLink.png' style='vertical-align:middle;' onclick='execute_example("${mapping}", "${preferredMethod}", ${u.toJSString(e)}, ${u.toJSString(p.resourcesPath)})'>
			 	</div>
				<div style='clear:both'> </div>
			</h4>
			</div>
		</#local>
		<#local ret = ret + ret2>
		
		<#local ret = ret + "<div class='toggle-child' style='margin-left:2.5%; margin-bottom:2.5%' >" >
		<#if e.getParams?has_content >
			<#list e.getParams?keys as k>
				<#local ret = ret + '<li><b>' + k + '</b>'>
				<#local ret = ret + ' &ndash; ' + e.getParams[k]>
				<#local ret = ret + '</li>'>
			 </#list>
			 
		</#if>
		
		<#local ret = ret + "<input type='button' value='Use Example' onclick='useExample(${parameters}, ${postFile}, ${putFile}, ${u.toJSString(p.resourcesPath)})' />" >
		<#local ret = ret + "</div>" >
		<#local ret = ret + "</div>" >
		<#local count = count + 1>
	</#list>
	<#return ret>
</#function>
