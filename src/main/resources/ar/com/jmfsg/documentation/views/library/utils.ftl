<#-- Función que convierte un SimpleHash de freemarker a un string de js -->
<#function hashToJSString hash>
<#local ret = '{'>
	<#list hash?keys as k>
		<#local ret = ret + ' \"' + k + '\" :'>
		<#local ret = ret + ' \"' + hash[k] + '\" '>
		<#local ret = ret + ', '>
    </#list>
<#local ret = ret + '}'>
<#return ret>
</#function>