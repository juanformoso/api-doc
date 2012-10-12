<#-- Armamos el div con los tabs y las consolas pertinentes. 
	 Llama a postConsole.ftl para la consola post. 				-->
<#import "/library/postConsole.ftl" as pc />
<#import "/library/utils.ftl" as u />
	 
<#assign consolesInfo =  
	{ 
		"get" : '<div id="getConsole"><input type="button" value="Show Console" onclick="showConsole()" /></div>',
		"post" : pc.postConsole('postConsole')
	}
>

<#macro consoles>
<#local supportedMappings = m.method?keys>

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