<#import "/spring.ftl" as s />
<#import "/library/container.ftl" as c />
<#import "/library/utils.ftl" as u />

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
	<div id="general" class="toggle-parent"> 
	    <h2><span class="toggle-title">- General</span></h2>
	    <div class="toggle-child">
	   		${general.projectSummary?replace("##BASE_URL##", relativePath + springMacroRequestContext.getContextPath())}
		</div>
	</div>
	<div id="methods" class="toggle-parent">
    	<h2><span class="toggle-title">- Methods</span></h2>
    	<div class="toggle-child">
   			${general.methodSummary?replace("##BASE_URL##", relativePath + springMacroRequestContext.getContextPath())}
   		</div>
   	</div>

<#list controllers?keys?sort as key>
	<div id="${key}" class="toggle-parent">
	<h3><a href="#${key}" name="${key}"><span class="toggle-title">- ${key}</span></a>&nbsp;<#if controllers[key].extraInfo?has_content><a href="${relativePath + springMacroRequestContext.getContextPath()}/docs/page/${controllers[key].extraInfo}" class="more_info">[+]</a> </#if></h3>
	
	<div class="toggle-child">
	<#if controllers[key].description?has_content>
		${controllers[key].description}
	</#if>

    <ul>
    	<#list controllers[key].methods as m>
	    	<@u.indexPageMethodIndex m.data m.support 'tags' />
        </#list>
    </ul>
    
    <#list controllers[key].subGroups?keys?sort as subKey>
		<div id="${key}" class="toggle-parent" closed="true">	
		<h4><a href="#${subKey}" name="${subKey}"><span class="toggle-title">- ${subKey}</span></a>&nbsp;<#if controllers[key].subGroups[subKey].extraInfo?has_content><a href="${relativePath + springMacroRequestContext.getContextPath()}/docs/page/${controllers[key].subGroups[subKey].extraInfo}" class="more_info">[+]</a> </#if></h4>
		
		<div class="toggle-child">
		<#if controllers[key].subGroups[subKey].description?has_content>
			${controllers[key].subGroups[subKey].description}
		</#if>
	
	    <ul class="subGroup">
	    	<#list controllers[key].subGroups[subKey].methods as m>
		    	<@u.indexPageMethodIndex m.data m.support 'tags' />
	        </#list>
	    </ul>
	    </div>
	    </div>
	</#list>
	</div>
	</div>
</#list>

</@c.containerFor>

<script type="text/javascript">
	$(document).ready(function() {
        $('.toggle-parent').mouseover(function () {
				$(this).css('cursor', 'pointer');
		});
		
        $('.toggle-parent').click(function(e) {
		  
		  if($(e.target).is("div.toggle-child a")) {
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
		
		$('.toggle-parent').each(function(index, e){
			if($(e).attr('closed')) {
				$(e).click()
			}
		})
		
	});
</script>