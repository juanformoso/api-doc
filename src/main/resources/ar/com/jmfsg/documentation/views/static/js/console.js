var console = function () {
    var _targetUrl;
    var _paramFields;

    return {
        build: function (div, route, parameters, vectParameters, url, optParameters, methods) {

        	$(div).empty();

            var options = $("<select id='method' style='margin: 10px;' class='span2'/>");

            for (var i = 0; i < methods.length; i++) {
            	var m = methods[i];
            	$(options).append("<option value='" + m + "'>" + m.toUpperCase() + "</option>");
            }

            _targetUrl = url;

            _paramFields = parameters;

            if (parameters.length > 0) {
                $(div).append($('<h3>Parameters</h3>'));
                var table = $('<table width="100%"/>');
                console.appendParameters($(table), parameters, 0);
                $(div).append(table);
            }

            //Agrego seccion de parametros opcionales
            if (typeof optParameters != "undefined" && optParameters.length > 0) {
            	var optDiv = 		$('<div id="optDiv" style="height:auto"></div>');
            	var optHeadDiv = 	$('<div id="optHeadDiv" class="toggle-parent"></div>');

            	$(optHeadDiv).append($('<h4> -Optional Parameters</h4>'));

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

                //Registro la función de colapsado para los nuevos componentes
                registerToggleFunction();
            }

            var result = $('<div id="response"/>');
            var action = $('<div id="actions"/>');

            var doIt = $('<span style="margin: 10px 0 10px 0;"><input type="button" id="doIt" value="Call Method" class="btn btn-info"/></span>');

            $(action).append(doIt).append(options);

            $(doIt).click(function () {
    			console.makeRequest(route, _paramFields, result, doIt);
        	});


            // Si es post o put, agrego text area para el request body
            if(methods.indexOf('post') > -1 || methods.indexOf('put') > -1) {

            	$(div).append($('<h3>Request Body</h3>'));
            	$(div).append($('<textarea id="requestBody"/>'));
            	$(div).append(action);

            	codeMirrors['requestBody'] = 'requestBody';
            	codeMirrors['requestBody'] = CodeMirror.fromTextArea($('#'+codeMirrors['requestBody'])[0], {name: "javascript", json: true});
            } else {
            	var doItNew = $('<img src="../../static/img/externalLink.png">' )

                doItNew.click(
            		function() {
            			var toCall = console.getToCall(route, _paramFields, $('#method').val());
            			OpenWindow = window.open(toCall, "_blank");
         		});

            	$(action).append(doItNew);
                $(div).append(action);

            }

            $(div).append(result);
        },
        makeRequest: function(toCall, withParams, writeTo, actionButton) {
        	var method = $('#method').val();
        	toCall = console.getToCall(toCall, withParams, method);

        	$.ajax({
        		url : toCall,
        		type : method.toUpperCase(),
        		data : codeMirrors['requestBody'] != null ? parseDynamicDate(codeMirrors['requestBody'].getValue()) : null,
        		contentType : "application/json; charset=utf-8",
                complete: function (req, status) {
                    actionButton.removeAttr('disabled');
                },
                success: function (data, status, req) {
                	console.showResponse(toCall, data, false, method, 200);
                },
                dataType: 'json',
                error: function (req, status, e) {
                	console.showResponse(toCall, req.responseText, true, method, req.status);
                }
        	})
        },
        showResponse: function (url, message, error, method, status) {
        	var response = $('#response');
        	var data;

        	url = console.replace(url, '<', '&lt;');
            var value = '<h3>Response</h3>';
            value += '<p><b>URL: &nbsp;</b>' + url + '</p>';

            if (error) {
            	value += '<p><span class="badge badge-important">STATUS ' + status + '</span></p>';
            	data = message;
        	} else {
        		value += '<p><span class="badge badge-success">STATUS ' + status + '</span></p>';
        		data = console.replace(JSON.stringify(message, null, 1), '<', '&lt;')
        	}

            var textAreaId = 'responseTextArea';
            value += '<textarea id=' + textAreaId + '/>';
            response.html(value);

            $('#' + textAreaId).html(data);

            codeMirrors[textAreaId] = textAreaId;
            codeMirrors[textAreaId] = CodeMirror.fromTextArea($('#'+codeMirrors[textAreaId])[0], {name: "javascript", json: true});

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
        getToCall: function(toCall, withParams, method) {
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
            	if (!parameters[i].hidden) {
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