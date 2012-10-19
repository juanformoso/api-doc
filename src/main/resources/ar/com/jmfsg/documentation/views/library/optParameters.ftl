<#import "/library/utils.ftl" as u />

<#-- Macro que expande a parámetros opcionales -->
<#macro optParameters>
<#if m.request?has_content && m.request.optParameters?has_content>
<div id="Optional Parameters" class="toggle-parent">
                <h3>- Optional Parameters</h3>
			</div>
			<div class="toggle-child" >
			<p>Optional parameters are passed through query string.</p>
                <ul>
                	${u.render_object(m.request.optParameters)}
            </div>
</#if>
</#macro>