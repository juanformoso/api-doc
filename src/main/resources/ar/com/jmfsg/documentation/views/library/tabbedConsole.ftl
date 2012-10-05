<#-- Armamos el div con los tabs y las consolas pertinentes. 
	 Llama a postConsole.ftl para la consola post. 				-->
<#import "/library/postConsole.ftl" as pc />
	 
<#assign consolesInfo =  
	{ 
		"GET" : '<div id="getConsole"><input type="button" value="Show Console" onclick="showConsole()" /></div>',
		"POST" : pc.postConsole('postConsole')
	}
>

<#macro consoles>
<#if m.supportedMappings?has_content>
	<#local supportedMappings = m.supportedMappings>
<#else>
	<#local supportedMappings = [ "GET" ]>
</#if>

<div id="consoles">
	<ul class="tabs">
		${obtain_tabs(supportedMappings)}
	</ul>
	<div class="panes">
		${obtain_panes(supportedMappings)}
    </div>
</div>
</#macro>

<#function obtain_tabs supportedMappings>
<#local ret = ''>
<#list consolesInfo?keys as k>
	<#if supportedMappings?seq_contains(k) >
		<#local ret = ret + '<li><a href="#">${k}</a></li>' >
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