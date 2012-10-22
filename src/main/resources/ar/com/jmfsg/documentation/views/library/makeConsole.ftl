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
<#local ret = ret + '<input type="button" id="${buttonName}" value="${methodName?capitalize} !" onclick="${consoleFunction}(\'${mapping}\', \'${methodName}\', \'${resultName}\')"/>\n' >
<#local ret = ret + '<img src="../../static/img/externalLink.png" onClick="${newFunction}(\'${mapping}\',  \'${methodName}\')" >\n' >
<#local ret = ret + '<textarea id="${methodName}TextArea"></textarea>'>
<#local ret = ret + '<div id="${resultName}"></div>' >
<#-- local ret = ret + '<div id="postResult"> <p> </p> <code id="postResultJson" class="json"></code> </div>' -->
<#local ret = ret + '</div>' >
</#if>
<#return ret>
</#function>