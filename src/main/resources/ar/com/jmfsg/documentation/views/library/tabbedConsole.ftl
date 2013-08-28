<#-- Armamos el div con los tabs y las consolas pertinentes.
	 Llama a makeConsole.ftl para las consolas. -->
<#-- http://jquerytools.org/demos/tabs/index.html -->
<#import "/library/makeConsole.ftl" as pc />
<#import "/library/utils.ftl" as u />

<#macro consoles>
	<#local supportedMappings = m.method?keys>
	<#local canMakeConsole = false>

	<h2>Try it!</h2>

	<div id="consoles">
		<#if m.request??>
			<div id="console">
				<h3>Parameters</h3>
				<@pc.createUriForm />
				<@pc.createBodyConsole />
				<div>
					<@createExecutionButtons />
					${createMethods(supportedMappings)}
				</div>
				<@pc.createBodyResponse />
			</div>
		</#if>
	</div>
</#macro>

<#macro createExecutionButtons>
	<div class="btn-group">
		<a class="btn btn-info" id="execButton" onclick="consoleBehaviour.execute()">Call Method!</a>
		<a class="btn btn-info" id="extExecButton" onclick="consoleBehaviour.executeNew()" href="#"><span class="icon-share-alt" style="vertical-align:middle"></span></a>
	</div>
</#macro>

<#function createMethods supportedMappings>
<#local ret = '<select id="method" class="span2" style="margin-top: 10px;">'>
<#list supportedMappings as k>
	<#local ret = ret + '<option id="${k}">${k?upper_case}</a></li>' >
</#list>
	<#local ret = ret + '</select>'>
<#return ret>
</#function>

