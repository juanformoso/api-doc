<#-- Archivo con los macros para armar la consola de post -->
<#import "/library/paths.ftl" as p>

<#-- Arma la consola de post, recibe el nombre del div al cual agregar la consola -->
<#function postConsole divName>
<#local ret = ''>
<#local postMapping = "${p.methodPath}" + "${m.postMapping}" >
<#if m.postMapping?has_content> 
<#local ret = ret + '<div id="${divName}">' > 
<#local ret = ret + '<input type="button" id="postButton" value="Post!" onclick="postConsoleJson(\'${postMapping}\', \'postResult\')"/>\n' >
<#local ret = ret + '<textarea id="postTextArea"></textarea>'>
<#local ret = ret + '<div id="postResult"></div>' >
<#-- local ret = ret + '<div id="postResult"> <p> </p> <code id="postResultJson" class="json"></code> </div>' -->
<#local ret = ret + '</div>' >
</#if>
<#return ret>
</#function>