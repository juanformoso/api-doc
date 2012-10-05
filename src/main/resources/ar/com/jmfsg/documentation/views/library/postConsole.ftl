<#-- Archivo con los macros para armar la consola de post -->

<#-- Arma la consola de post, recibe el nombre del div al cual agregar la consola -->
<#function postConsole divName>
<#local ret = ''>
<#local ret = ret + '<div id="${divName}"><input type="button" id="postButton" value="Post!" onclick="postConsoleJson(\'${m.postMapping}\')"/></div>\n' >
<#local ret = ret + '<link rel="stylesheet" href="../../static/css/codemirror.css">' >
<#local ret = ret + '<script src="../../static/js/codemirror-compressed.js"> </script>' >
<#return ret>
</#function>