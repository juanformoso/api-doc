<#ftl strip_whitespace=true>
<#if general.relativePath?has_content>
   	<#assign relativePath = "${general.relativePath}">
<#else>
	<#assign relativePath = "">
</#if>

<#macro containerFor title subtitle extraJS=false>

<@compress single_line=true>
<@fixedHead />
<title>${title}</title>
</head>
<@fixedBodyFor>
        <div id="content">
			<div class="subheader">
        		<h1>${subtitle}</h1>
    		</div>

			<div class="content-page">
				<#nested />
			</div>
		</div>
</@fixedBodyFor>
</@compress>
</#macro>

<#macro fixedBodyFor>
<body>
    <div id="custom-header"></div>
    <div class="container">        
        <div id="header">
	        <#if general?has_content && general.headerImageUrl?has_content && general.headerImageSize?has_content>
    	        <a href="<@s.url "${relativePath}/docs" />" class="logo" style="background:url(${general.headerImageUrl});width:${general.headerImageSize}"></a>
    	    <#else>
    	    	<a href="<@s.url "${relativePath}/docs" />" class="logo"></a>
           </#if>
            <#if general?has_content && general.twitterUsername?has_content>
            <div style="margin-top:-50px;float:right">
	            <a href="http://twitter.com/${general.twitterUsername}"><img src="<@s.url "${relativePath}/static/img/twitter.gif" />" style="width:170px;height:70px" /></a>
	         </div>
	         </#if>
        </div>
        <div id="content">
        	<#nested />
       	</div>
   </div>
   <div id="footer">
        <div class="footerwrap">
            <div id="footer-menu">
                <a href="<@s.url "${relativePath}/docs/page/faq" />">faq</a>
                <div id="footer-sites">
                </div>
            </div>
            <div id="footer-flair">
            </div>
            <div id="copyright">
            </div>
        </div>
    </div>
    <#if footerNewRelicScript?has_content>
		${footerNewRelicScript}
	</#if>
</body>
</html>
</#macro>

<#macro fixedHead>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<#if headerNewRelicScript?has_content>
	${headerNewRelicScript}
</#if>
<link rel="stylesheet" href="<@s.url "${relativePath}/static/css/all.css" />" />
<link rel="icon" type="image/x-icon" href="<@s.url "${relativePath}/static/img/favicon.gif" />"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
</#macro>

<#macro fixedHeadFor>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<#if headerNewRelicScript?has_content>
	${headerNewRelicScript}
</#if>
<link rel="stylesheet" href="<@s.url "${relativePath}/static/css/all.css" />" />
<link rel="icon" type="image/x-icon" href="<@s.url "${relativePath}/static/img/favicon.gif" />"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
<#nested/>
</head>
</#macro>

<#macro fixedFooter>
    </div>
    <div id="footer">
        <div class="footerwrap">
            <div id="footer-menu">
                <a href="<@s.url "${relativePath}/docs/page/faq" />">faq</a>
                <div id="footer-sites">
                </div>
            </div>
            <div id="footer-flair">
            </div>
            <div id="copyright">
            </div>
        </div>
    </div>
    <#if footerNewRelicScript?has_content>
		${footerNewRelicScript}
	</#if>
</body>
</html>
</#macro>