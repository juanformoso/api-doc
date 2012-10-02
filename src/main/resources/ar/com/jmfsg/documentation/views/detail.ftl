<#import "/spring.ftl" as s />
<#import "/library/container.ftl" as c />
<#import "/library/examples.ftl" as e />
<#import "/library/optParameters.ftl" as o />
<#import "/library/utils.ftl" as u />

<@c.fixedHeadFor >

<#if general.relativePath?has_content>
   	<#assign relativePath = "${general.relativePath}">
<#else>
	<#assign relativePath = "">
</#if>

<script type="text/javascript" src="<@s.url "${relativePath}/static/js/console.js?v=3" />" > </script>
<script type="text/javascript" src="<@s.url "${relativePath}/static/js/detail.js?v=3" />"  > </script>
<script type="text/javascript">
//Javascript associated with detail view
function showConsole() {
    var x = $('#console');
    var method= "<@s.url "${general.methodPath + m.requestMapping?replace(':.+', '')}" />";
    var parameters = [<#if m.request?has_content>
    	<#if m.request.parameters?has_content>
        	<#list m.request.parameters as p>'${p.name}',</#list>
        </#if>
        <#if m.request.filters?has_content>
        	<#list m.request.filters as p>'${p.name}',</#list>
        </#if>
        <#if m.request.options?has_content>
        	<#list m.request.options as p>'${p.name}',</#list>
        </#if>
        <#if m.request.facets?has_content>
        	<#list m.request.facets as p>'${p.name}',</#list>
        </#if>
        <#if m.request.paginable?has_content>'page','pagesize',</#if>
        <#if m.request.sortable?has_content>'sort','order',</#if>
    </#if>];

	var apiUrl = "http://" + window.location.host;
	var optParameters = <#if m.request?has_content && m.request.parameters?has_content>${u.toJSString(m.request.optParameters)}<#else>{}</#if>
    console.build(x, method, parameters, {<#if m.request?has_content && m.request.parameters?has_content><#list m.request.parameters as p><#if p.vectorized?has_content && p.vectorized>'${p.name}':true<#if p_has_next>,</#if></#if></#list></#if>}, apiUrl, optParameters);
}

$(document).ready(function() {
    registerToggleFunction();
});
</script>

<title>Usage of ${m.friendlyName}</title>
</@c.fixedHeadFor>

<@c.fixedBodyFor>

    <div class="subheader">
        <h1>Usage of ${m.friendlyName}</h1>
    </div>

    <div class="content-page">
        <div id="discussion">
        <h2>Discussion</h2>
 <#if m.longDescription?has_content>
 <p>${m.longDescription}</p>
 <#else>
 <p>${m.description}<p>
 </#if>
 <#if m.method?has_content && (m.method == "POST" || m.method == "PUT")>
 <p>
 This method receives a <b>POST</b> or <b>PUT</b>. The console is not supported at the moment for these methods. <br/> 
 Keep in mind that the data has to be posted in <b>JSON</b> format. For example, if the method receives a string called "parameterA", a number called "parameterB", and a Dictionary called "parameterC", the posted JSON has to be like this:<br/>
 </p>
 <code><pre>
{
	"parameterA": "valueA",
	"parameterB": 1234,
	"parameterC": {
		"key1": "value1",
		"key2": "value2"
	}
}</pre></code>
 
</#if>
        </div>

        <#if m.request?has_content && m.request.parameters?has_content>
        <div>
        	<div id="parameters" class="toggle-parent">
                <h2>- Parameters</h2>
			</div>
			<div class="toggle-child" >
			<p>Parameters may refer to values in the URL, entity properies posted as json, or both.</p>
                <ul>
                	${u.render_object(m.request.parameters)}
                	
            	<#-- Parametros opcionales -->
            	<@o.optParameters />
            </div>
            
            
            
            </div>
            </#if>
            
            <#if m.request?has_content && m.request.filters?has_content>
            <div>
        <div id="filters" class="toggle-parent">
                <h2>- Filters</h2>
                </div>
                <div class="toggle-child">
				<p>Filters are a list of values that are used to narrow down the search. They are always required unless otherwise stated</p>
                <ul>
                <#list m.request.filters as f>
					<li><b>${f.name}</b> &ndash; ${resolve_description(f)}</li>
				</#list>
				</ul>
				</div>
            </div>
            </#if>
            
            <#if m.request?has_content && (m.request.options?has_content || m.request.paginable?has_content || m.request.sortable?has_content)>
            <div>
        <div id="options" class="toggle-parent">
                <h2>- Options</h2>
                </div>
                <div class="toggle-child">
				<p>Options are a list of values that are used to customize the resultset. They are usually optional and have default values</p>
                <ul>
            	<#if m.request.paginable?has_content && m.request.paginable>
            		<li><b>page</b> &ndash; The pagination offset for the current collection. Affected by the specified pagesize. <i>32-bit signed integer</i><ul><li><b>default value</b>: 1</li></ul></li>
					<li><b>pagesize</b> &ndash; The number of collection results to display during pagination. Should be between 0 and 100 inclusive. <i>32-bit signed integer</i><ul><li><b>default value</b>: 30</li></ul></li>
            	</#if>
            	<#if m.request.sortable?has_content>
	            	<li><b>sort</b> &ndash; How a collection should be sorted. <i>one of <#list m.request.sortable.possibleValues as v>${v}&nbsp;</#list></i><ul><li><b>default value</b>: none</li></ul></li>
					<li><b>order</b> &ndash; How the current sort should be ordered. <i>one of asc, or desc</i><ul><li><b>default value</b>: asc</li></ul></li>
            	</#if>
            	<#if m.request.options?has_content>
                <#list m.request.options as o>
					<li><b>${o.name}</b> &ndash; ${resolve_description(o)} <i>${o.type}</i>
					<#if o.longDescription?has_content>
						<ul><li>${o.longDescription}</li></ul>
					</#if>
					<#if o.defaultValue?has_content>
						<ul><li><b>default value</b>: ${o.defaultValue}</li></ul> 
					</#if>
					</li>
				</#list>
				</#if>
				</ul>
			</div>
            </div>
            </#if>
            
            <#if m.request?has_content && m.request.facets?has_content>
            <div>
        <div id="filters" class="toggle-parent">
                <h2>- Facets</h2>
                </div>
                <div class="toggle-child">
				<p>Facets are extra filters that modify the original request. The list of available facets and their types and possible values are included in the service response. <br> This service supports the following ones.</p>
                <ul>
                	${u.render_object(m.request.facets)}
				</ul>
				</div>
            </div>
            </#if>
            
            <#if m.response?has_content || m.dynamicResponse?has_content>
            	<div>
	        		<div id="response" class="toggle-parent">
	                	<h2>+ Response</h2>
	                </div>
	                <div class="toggle-child" style="display: none;">
						<p>These are the fields returned by this method. There may be additional ones not documented here, but these will always be present.
						<#if m.responseIsList?has_content && m.responseIsList>
						<br/>This method returns a list.
						</#if>
						</p>
		                <ul>
		                	<#if m.dynamicResponse?has_content>
		                		This response varies depending on some variable specific to the method, the different responses are as follows:
		                		<li>
		                		<#list m.dynamicResponse as op>
		                			<ul>
		                				<h3>${op.name}</h3>
		                				${u.render_object(op.response)}
		                			</ul>
		                		</#list>
		                		</li>
		                	<#else>
		                		${u.render_object(m.response)}
		                	</#if>
						</ul>
					</div>
	            </div>
            </#if>
            
          <#if m.responseSummary?has_content>
          	<div>
	        		<div id="responseSummary" class="toggle-parent">
	                	<h2>+ Response Summary</h2>
	                </div>
	                <div class="toggle-child" style="display: none;">
	                	<p>These are the fields returned by this method as a summary of its execution. There may be additional ones not documented here, but these will always be present (if they have values, otherwise they are ignored).</p>
	                	<ul>
	                		${u.render_object(m.responseSummary)}
	                	</ul>
					</div>
			</div>
          </#if>
            
            <#-- Agrego ejemplos -->
            <@e.examples/>
            
<#-- Imprime los ejemplos, prepara el código para llenar la consola -->
<#function render_examples egs>
	<#local ret = ''>
	<#list egs as e>
		<#local count = 1>
		<#local ret = ret + "<div id='example' + ${count} class='example'>" >
		<#list e?keys as k>
			<#local ret = ret + '<li><b>' + k + '</b>'>
			<#local ret = ret + ' &ndash; ' + e[k]>
			<#local ret = ret + '</li>'>
		 </#list>
		<#local ret = ret + "<input type='button' value='Use Example' onclick='useExample(${count})' />" >
		<#local ret = ret + "</div>" >
		<#local count = count + 1>
	</#list>
	<#return ret>
</#function>

          
            <#if m.facets?has_content>
            <div>
        <div id="options" class="toggle-parent">
                <h2>+ Facets</h2>
                </div>
                <div class="toggle-child" style="display: none;">
				<p>Implementation of <a href="http://en.wikipedia.org/wiki/Faceted_classification">faceted classification</a> to further filter results, they are optional and all possible values for a specific resultset will be present in the meta node.
				All facet values must be sent separated by a hyphen (-) if you want to specify multiple values.<br/>
				For example, if the resultset are hotels and they can be filter by the star rating, and the returned hotels have 2 and 3 stars, the node would look like this:</p>
				<!--
				<pre>
				meta: {
					facets: {
				 		stars: {
				 			[2,3]
				 		}
					}
				}
				</pre> -->
				 <code>
<pre>
meta: {	
	facets: [{
		key: 'stars',
		type: 'discrete',
		values: [{
				id: 2,
				count: 10
			},
			{
				id: 3,
				count: 15
			}]
		}]
	}
</pre></code>
				 <p>
                <ul>
                <#list m.request.facets as f>
					<li><b>${f.name}</b> &ndash; ${resolve_description(f)} <i>${f.type}</i>
					</li>
				</#list>
				</ul>
				</p>
				</div>
            </div>
            </#if>
            
            <div>

		<#if !m.method?has_content || m.method == "GET" || (m.implemented?has_content && m.implemented) >
            <h2>Try it!</h2>
            <div id="console"><input type="button" value="Show Console" onclick="showConsole()" /></div>
		</#if>
        </div>
            
    </div>


        </div>
    </div>
</@c.fixedBodyFor>
