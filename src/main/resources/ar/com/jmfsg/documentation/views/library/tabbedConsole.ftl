<#-- Armamos el div con los tabs y las consolas pertinentes.
	 Llama a makeConsole.ftl para las consolas. -->
<#-- http://jquerytools.org/demos/tabs/index.html -->
<#import "/library/makeConsole.ftl" as pc />
<#import "/library/utils.ftl" as u />
	 
<#assign consoleButtons =  
	{ 
		"head" : createConsoleButton('head'),
		"get" : createConsoleButton('get'),
		"post" : createConsoleButton('post'),
		"put" : createConsoleButton('put')
	}
>

<#macro consoles>
	<#local supportedMappings = m.method?keys>
	<#local canMakeConsole = false>
	
	<#list supportedMappings as m> <#-- Verifico que haya algún mapping con consola -->
		<#if consoleButtons?keys?seq_contains(m)>
			<#local canMakeConsole = true>
		</#if>
	</#list>
	
	<#if canMakeConsole>
		<h2>Try it!</h2>
		
		<div id="consoles">
			<div id="tabsDiv">
				<ul class="tabs">
					${obtain_tabs(supportedMappings)}
				</ul>
				<div class="panes">
					${obtain_panes(supportedMappings)}
			    </div>
			</div>
				<#if m.request??>
					<div id="console">
						<h3>Parameters</h3>
						<@pc.createUriForm />
						<@pc.createBodyConsole />
					</div>
				</#if>
		</div>
	</#if>
</#macro>

<#function obtain_tabs supportedMappings>
<#local ret = ''>
<#list consoleButtons?keys as k>
	<#if supportedMappings?seq_contains(k) >
		<#local ret = ret + '<li><a href="#" class="tabButton">${k?upper_case}</a></li>' >
	</#if>
</#list>
<#return ret>
</#function>

<#function obtain_panes supportedMappings>
<#local ret = ''>
<#list consoleButtons?keys as k>
	<#if supportedMappings?seq_contains(k) >
		<#local ret = ret + consoleButtons[k]>
	</#if>
</#list>
<#return ret>
</#function>

<#function createConsoleButton methodName>
	<#return '<div class="pane"><input type="button" class="execButton" id="${methodName}Button" value="${methodName?capitalize} !" onclick="consoleBehaviour.execute(\'${methodName}\')"/></div>\n' >
</#function>

