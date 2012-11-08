var console = function () {
    var _targetUrl;
    var _paramFields;

    return {
        build: function (div, route, parameters, vectParameters, url, optParameters) {
            $(div).empty();

            _targetUrl = url;

            _paramFields = parameters;

            if (parameters.length > 0) {
                $(div).append($('<h3>Parameters</h3>'));

                var table = $('<table width="100%"></table>');

                console.appendParameters($(table), parameters, 0);
                
                $(div).append(table);
            }

            //Agrego seccion de parametros opcionales
            if (typeof optParameters != "undefined" && optParameters.length > 0) {
            	var optDiv = $('<div id="optDiv" style="height:auto"></div>');
            	var optHeadDiv = $('<div id="optHeadDiv" class="toggle-parent"></div>');
                $(optHeadDiv).append($('<h4 > -Optional Parameters</h4>'));

            	var optParamDiv = $('<div id="optParamDiv" style="padding-left:20px" class="toggle-child" ></div>')
                var table = $('<table width="90%"></table>');

                for (var i = 0; i < optParameters.length; i++) {
                    var p = $('<tr><td><b>' + optParameters[i]["name"] + '</b>&nbsp;' + '</td><td style="margin-left:20px;"><input type="text" id="p-' + optParameters[i]["name"] + '" /></td></tr>');

                    _paramFields[_paramFields.length] = { name: optParameters[i]["name"] };

                    $(table).append(p);
                }
                
                //Agrego estos nuevos elementos al div original
                $(optDiv).append(optHeadDiv);
                $(optParamDiv).append(table);
                $(optDiv).append(optParamDiv);
                $(div).append(optDiv);

                //Registro la función de colapsado para los nuevos componente 
                registerToggleFunction();
            }
            
            var result = $('<div id="result"></div>');

            var doIt = $('<input type="button" id="doIt" value="Call Method" />');

            
            
            var doItNew = $('<img src="../../static/img/externalLink.png">' )

            $(div).append(result);
            $(div).append(doIt);
            $(div).append(doItNew);

            doIt.click(
                function () {
                    console.makeCall(route, _paramFields, result, doIt);
                });
            
            doItNew.click(
            		function() {
            			var toCall = console.getToCall(route, _paramFields);
            			OpenWindow = window.open(toCall, "_blank");
            		});            
        },
        makeCall: function (toCall, withParams, writeTo, actionButton) {
            actionButton.attr('disabled', 'true');

            toCall = console.getToCall(toCall, withParams);

            $.ajax(
                {
                    url: toCall,
                    success: function (data, status, req) {
                        var value = '<p>From calling: <a href="' + toCall + '">' + console.replace(toCall, '<', '&lt;') + '</a></p>';
                        value += '<code class="json"><pre>' + console.replace(JSON.stringify(data, null, 1), '<', '&lt;') + '</pre></code>';

                        writeTo.html(value);
                    },
                    dataType: 'json',
                    complete: function (req, status) {
                        actionButton.removeAttr('disabled');
                    },
                    error: function (req, status, e) {
                        writeTo.html('From calling: ' + console.replace(toCall, '<', '&lt;') + '<br/>An Error Occured:<br/>' + e);
                    }
                });
        },
        replace: function (text, target, replaceWith) {
            // IE regex differs from... everything else
            //   Arguably, it makes more sense but still
            if (!$.browser.msie) {
                replaceWith = replaceWith.replace(/\$/g, "$$$");
            }

            while (text.indexOf(target) != -1) {
                text = text.replace(target, replaceWith);
            }

            return text;
        },
        getToCall: function(toCall, withParams) {
            var toCall = _targetUrl + toCall;

            withParams = console.flattenParameters(withParams);
            
            var firstP = true;

            for (var i = 0; i < withParams.length; i++) {
                var value = $('#p-' + withParams[i].name).val();
                value = dynamicDate(value);

                if (!value) continue;

                var newCall = console.replace(toCall, '{' + withParams[i].name + '}', encodeURIComponent(value));

                if (newCall == toCall) {
                    toCall = toCall + (firstP ? '?' : '&') + withParams[i].name + '=' + encodeURIComponent(value);
                    firstP = false;
                } else {
                    toCall = newCall;
                }
            }
            return toCall;
        },
        clean: function() {
        	if (typeof _paramFields != 'undefined') {
	        	for (var i = 0; i < _paramFields.length; i++) {
	                $('#p-' + _paramFields[i].name).val("");
	            }
        	}
        },
        appendParameters: function(appender, parameters, indent) {
            for (var i = 0; i < parameters.length; i++) {
                var vect = parameters[i].vectorized ? "<span class='vectorized' title='This parameter takes multiple values, if comma delimitted'>vectorized</span>" : "";
                var input = !parameters[i].isPhony ? '<input type="text" id="p-' + parameters[i].name + '" /></td></tr>' : "";
                
                var space = ''
                var sCount = indent * 2;
                for (var s = sCount; s; s--) { space = space + '&nbsp;' } 
                
                var p = $('<tr><td><b>' + space + parameters[i].name + '</b>&nbsp;' + vect + '</td><td style="margin-left:10px;">' + input);
                
                appender.append(p);
                
                if (parameters[i].children) {
                	console.appendParameters(appender, parameters[i].children, indent + 1);
                }
            }
        },
        flattenParameters: function(withParams, appender) {
        	if (typeof appender === 'undefined') {
        		appender = [];
        	}
        	for (var i = 0; i < withParams.length; i++) {
    			appender[appender.length] = withParams[i]
    			if (withParams[i].children) {
    				console.flattenParameters(withParams[i].children, appender);
    			}
        	}
        	return appender;
        }
    };
} ();