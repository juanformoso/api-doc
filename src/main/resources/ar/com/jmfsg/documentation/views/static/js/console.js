var console = function () {
    var _targetUrl;

    return {
        build: function (div, route, parameters, vectParameters, url, optParameters) {
            $(div).empty();

            _targetUrl = url;

            var paramFields = [];

            if (parameters.length > 0) {
                $(div).append($('<h3>Parameters</h3>'));

                var table = $('<table width="100%"></table>');

                for (var i = 0; i < parameters.length; i++) {
                    var vect = vectParameters[parameters[i]] ? "<span class='vectorized' title='This parameter takes multiple values, if comma delimitted'>vectorized</span>" : "";

                    var p = $('<tr><td><b>' + parameters[i] + '</b>&nbsp;' + vect + '</td><td style="margin-left:10px;"><input type="text" id="p-' + parameters[i] + '" /></td></tr>');

                    paramFields[paramFields.length] = { name: parameters[i] };

                    $(table).append(p);
                }

                $(div).append(table);
            }

            //Agrego seccion de parametros opcionales
            if (typeof optParameters != "undefined" && optParameters.length > 0) {
            	var optDiv = $('<div id="optDiv" ></div>');
            	var optHeadDiv = $('<div id="optHeadDiv" class="toggle-parent"></div>');
                $(optHeadDiv).append($('<h4 > -Optional Parameters</h4>'));

            	var optParamDiv = $('<div id="optParamDiv" style="padding-left:20px" class="toggle-child" ></div>')
                var table = $('<table width="90%"></table>');

                for (var i = 0; i < optParameters.length; i++) {
                    var p = $('<tr><td><b>' + optParameters[i]["name"] + '</b>&nbsp;' + '</td><td style="margin-left:20px;"><input type="text" id="p-' + optParameters[i]["name"] + '" /></td></tr>');

                    paramFields[paramFields.length] = { name: optParameters[i]["name"] };

                    $(table).append(p);
                }
                
                $(optDiv).append(optHeadDiv);
                $(optParamDiv).append(table);
                $(optDiv).append(optParamDiv);
                $(div).append(optDiv);

                registerToggleFunction();
            }
            
            var result = $('<div id="result"></div>');

            var doIt = $('<input type="button" id="doIt" value="Call Method" />');

            $(div).append(result);
            $(div).append(doIt);

            $(document).ready();
            
            doIt.click(
                function () {
                    console.makeCall(route, paramFields, result, doIt);
                });
        },
        makeCall: function (toCall, withParams, writeTo, actionButton) {
            actionButton.attr('disabled', 'true');

            var toCall = _targetUrl + toCall;

            var firstP = true;

            for (var i = 0; i < withParams.length; i++) {
                var value = $('#p-' + withParams[i].name).val();

                if (!value) continue;

                var newCall = console.replace(toCall, '{' + withParams[i].name + '}', encodeURIComponent(value));

                if (newCall == toCall) {
                    toCall = toCall + (firstP ? '?' : '&') + withParams[i].name + '=' + encodeURIComponent(value);
                    firstP = false;
                } else {
                    toCall = newCall;
                }
            }

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
        }
    };
} ();