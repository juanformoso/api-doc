<#import "/spring.ftl" as s />
<#import "/library/container.ftl" as c />

<@c.containerFor "${general.projectName} usage" "${general.projectName} usage">
    <!-- <p>This is the usage documentation for ${general.projectName}.</p> -->
    
    <#if general.relativePath?has_content>
    	<#assign relativePath = "${general.relativePath}">
    <#else>
    	<#assign relativePath = "">
    </#if>

	<#if general.longDescription?has_content>
		${general.longDescription?replace("##BASE_URL##", relativePath + springMacroRequestContext.getContextPath())}
	</#if>
	
    <h2>General</h2>

   	${general.projectSummary?replace("##BASE_URL##", relativePath + springMacroRequestContext.getContextPath())}

    <h2>Methods</h2>

   	${general.methodSummary?replace("##BASE_URL##", relativePath + springMacroRequestContext.getContextPath())}

<#list controllers?keys?sort as key>
	<div id="${key}" class="toggle-parent">
	<h3><a href="#${key}" name="${key}"><span class="toggle-title">- ${key}</span></a>&nbsp;<#if controllers[key].extraInfo?has_content><a href="${relativePath + springMacroRequestContext.getContextPath()}/docs/page/${controllers[key].extraInfo}" class="more_info">[+]</a> </#if></h3>
	
	<div class="toggle-child">
	<#if controllers[key].description?has_content>
		${controllers[key].description}
	</#if>

    <ul>
    	<#list controllers[key].methods as m>
    		<#if m.data.method?has_content>
		    	<#assign method = "${m.data.method?lower_case}">
		    <#else>
		    	<#assign method = "get">
		    </#if>

	    	<#if m.data.friendlyName == "">
	    		<li>${m.data.requestMapping} <sub><sub><b>[${method}]</b></sub></sub><#if m.data.tags?has_content>${renderTags(m.data.tags)}</#if><#if m.data.implemented?has_content && !m.data.implemented><span class="not-implemented" title="This method is not currently implemented but will be included in a future release. Parameters and responses are subject to change in the final version.">not implemented</span></#if> &ndash; ${m.data.description}</li>
	    	<#else>
		        <li><a href="<@s.url "${relativePath}/docs/method/" + m.support.internalMethodName />">${m.data.requestMapping?replace(":.+", "")}</a> <sub><sub><b>[${method}]</b></sub></sub><#if m.data.tags?has_content>${renderTags(m.data.tags)}</#if><#if m.data.implemented?has_content && !m.data.implemented><span class="not-implemented" title="This method is not currently implemented but will be included in a future release. Parameters and responses are subject to change in the final version.">not implemented</span></#if> &ndash; ${m.data.description}</li>
		    </#if>
        </#list>
    </ul>
    
    <#list controllers[key].subGroups?keys?sort as subKey>
		<div id="${key}" class="toggle-parent">	
		<h4><a href="#${subKey}" name="${subKey}"><span class="toggle-title">- ${subKey}</span></a>&nbsp;<#if controllers[key].subGroups[subKey].extraInfo?has_content><a href="${relativePath + springMacroRequestContext.getContextPath()}/docs/page/${controllers[key].subGroups[subKey].extraInfo}" class="more_info">[+]</a> </#if></h4>
		
		<div class="toggle-child">
		<#if controllers[key].subGroups[subKey].description?has_content>
			${controllers[key].subGroups[subKey].description}
		</#if>
	
	    <ul class="subGroup">
	    	<#list controllers[key].subGroups[subKey].methods as m>
	    		<#if m.data.method?has_content>
			    	<#assign method = "${m.data.method?lower_case}">
			    <#else>
			    	<#assign method = "get">
			    </#if>
	
		    	<#if m.data.friendlyName == "">
		    		<li>${m.data.requestMapping} <sub><sub><b>[${method}]</b></sub></sub><#if m.data.implemented?has_content && !m.data.implemented><span class="not-implemented" title="This method is not currently implemented but will be included in a future release. Parameters and responses are subject to change in the final version.">not implemented</span></#if><#if m.data.tags?has_content>${renderTags(m.data.tags)}</#if> &ndash; ${m.data.description}</li>
		    	<#else>
			        <li><a href="<@s.url "${relativePath}/docs/method/" + m.support.internalMethodName />">${m.data.requestMapping?replace(":.+", "")}</a> <sub><sub><b>[${method}]</b></sub></sub><#if m.data.implemented?has_content && !m.data.implemented><span class="not-implemented" title="This method is not currently implemented but will be included in a future release. Parameters and responses are subject to change in the final version.">not implemented</span></#if><#if m.data.tags?has_content>${renderTags(m.data.tags)}</#if> &ndash; ${m.data.description}</li>
			    </#if>
	        </#list>
	    </ul>
	    </div>
	    </div>
	</#list>
	</div>
	</div>
</#list>

</@c.containerFor>

<#function renderTags methodTags>
	<#local ret = ''>
 	
 	<#list methodTags as tag>
 		<#if tags?has_content && tags?keys?seq_contains(tag)>
 			<#local ret = ret + '<span class="tags" title="' + tags[tag].title +'" style="background-color:' + tags[tag].color +'">' + tags[tag].name + '</span>'>
 		<#else>
 			<#local ret = ret + '<span class="tags" title="' + tag +'" style="background-color:#EEEEEE">' + tag + '</span>'>
 		</#if>
 	</#list> 	
 	
 	<#return ret>
 </#function>

<script type="text/javascript">
	$(document).ready(function() {
        $('.toggle-parent').mouseover(function () {
				$(this).css('cursor', 'pointer');
		});
		
        $('.toggle-parent').click(function(e) {
		  
		  if($(e.target).is("div.toggle-child ul li a")) {
		  	return;
		  }
		  
		  $(this).children('.toggle-child').slideToggle(400, function() {
		    // Animation complete.
		  });
		  
		  // TODO: JMF: Mejorar esto :P
		  if ($(this).find('.toggle-title:first').text().trim().charAt(0) == "+")
		    $(this).find('.toggle-title:first').text($(this).find('.toggle-title:first').text().replace("+", "-"));
 		  else
		    $(this).find('.toggle-title:first').text($(this).find('.toggle-title:first').text().replace("-", "+"));
		    
		  return false;
		});
	});
</script>