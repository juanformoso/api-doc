<#-- Armamos el div con los tabs y las consolas pertinentes. 
	 Llama a makeConsole.ftl para las consolas. -->
<#-- http://jquerytools.org/demos/tabs/index.html -->
<#import "/library/makeConsole.ftl" as pc />
<#import "/library/utils.ftl" as u />
	 
<#assign consolesInfo =  
	{ 
		"get" : '<div id="getConsole"><input type="button" value="Show Console" onclick="showConsole()" /></div>',
		"post" : pc.postConsole('postConsole'),
		"put" : pc.putConsole('putConsole')
	}
>

<#macro consoles>
<#local supportedMappings = m.method?keys>
<#local canMakeConsole = false>

<#list supportedMappings as m> <#-- Verifico que haya algún mapping con consola -->
	<#if consolesInfo?keys?seq_contains(m)>
		<#local canMakeConsole = true>
	</#if>
</#list>

<#if canMakeConsole>
	<h2>Try it!</h2>
	<div id="consoles">
		<ul class="tabs">
			${obtain_tabs(supportedMappings)}
		</ul>
		<div class="panes">
			${obtain_panes(supportedMappings)}
	    </div>
	</div>
</#if>
</#macro>

<#function obtain_tabs supportedMappings>
<#local ret = ''>
<#list consolesInfo?keys as k>
	<#if supportedMappings?seq_contains(k) >
		<#local ret = ret + '<li><a href="#">${k?upper_case}</a></li>' >
	</#if>
</#list>
<#return ret>
</#function>

<#function obtain_panes supportedMappings>
<#local ret = ''>
<#list consolesInfo?keys as k>
	<#if supportedMappings?seq_contains(k) >
		<#local ret = ret + consolesInfo[k]>
	</#if>
</#list>
<#return ret>
</#function>