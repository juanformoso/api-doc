var consoleBehaviour = function() {
	var _host = null;
	var _mappings = null;
	var _parameters = null;
	var _editor = null;
	var _uriForm = null;
	var _bodyConsole = null;
	var _noBodyMethodNames = ['GET', 'HEAD'];

    var getToCall = function(toCall, withParams) {
        var toCall = _host + toCall;

        withParams = flattenParameters(withParams);
        
        var firstP = true;

        for (var i = 0; i < withParams.length; i++) {
            var value = $('#p-' + withParams[i].name).val();
            value = dynamicDate(value);

            if (!value) continue;

            var newCall = replace(toCall, '{' + withParams[i].name + '}', encodeURIComponent(value));

            if (newCall == toCall) {
                toCall = toCall + (firstP ? '?' : '&') + withParams[i].name + '=' + encodeURIComponent(value);
                firstP = false;
            } else {
                toCall = newCall;
            }
        }
        return toCall;
    }
    
    var httpNewJson = function(_url, method) {
    	sendData = parseDynamicDate(editor.getValue())  
    	OpenWindow = window.open(_url, "_blank")
    	if (_noBodyMethodNames.indexOf(method.toUpperCase()) < 0) {
	    	$(OpenWindow).ready( function() {
	    		$.ajax({
	    			url : _url,
	    			type : method.toUpperCase(),
	    			data : sendData,
	    			contentType : "application/json; charset=utf-8",
	    	        success: function (data, status, req) {
	    	    		OpenWindow.document.write(JSON.stringify(data, null, 1))
	    	    		OpenWindow.document.close()
	    	        },
	    	        dataType: 'json',
	    	        error: function (req, status, e) {
	    	            OpenWindow.document.write('From calling: ' + _url + ' An Error Occured: ' + e +"\n");
	    	            OpenWindow.document.write("Request:\n");
	    	            OpenWindow.document.write(sendData);
	    	            OpenWindow.document.close();
	    	        }
	    		})
	    	});
    	}
    }
    
    var flattenParameters = function(withParams, appender) {
    	if (typeof appender === 'undefined') {
    		appender = [];
    	}
    	for (var i = 0; i < withParams.length; i++) {
			appender[appender.length] = withParams[i]
			if (withParams[i].children) {
				flattenParameters(withParams[i].children, appender);
			}
    	}
    	return appender;
    }
	
	return {
		build : function (host, mappings, parameters, editor, uriFormName, bodyConsoleName) {
			_host = host;
	    	_mappings = mappings;
	    	_parameters = parameters;
	    	_editor = editor;
	    	_uriForm = $('#'+uriFormName)[0];
	    	_bodyConsole = $('#'+bodyConsoleName)[0];
	    },
		
		execute : function (method) {
			var toCall = getToCall(_mappings[method], _parameters)
			httpNewJson(toCall, method)
		},
		
	    managePanes : function ( tabs ) {
	    	currentTabName = tabs.getCurrentTab()[0].text;
	    	if (_noBodyMethodNames.indexOf(currentTabName) >= 0) {
	    		_bodyConsole.style.display = 'none'
	    	} else {
	    		_bodyConsole.style.display = 'block'
	    	}
	    },
	    
	    useExample : function (parameters, bodyFileName, resourcesPath) {
	    	// Lleno la consola get si hay parámetros para usar
	    	if (typeof parameters != undefined && parameters != []) {
	    		var paramsKeys = Object.keys(parameters);
	    		for ( var i = 0; i < paramsKeys.length; i++) {
	    			var name = paramsKeys[i];
	    			var field = document.getElementById('p-' + name);
	    			if (typeof field !== "undefined" && field !== null) {
	    				field.value = parameters[paramsKeys[i]];
	    			}
	    		}
	    	}

	    	// Lleno la consola post si hay nombre de postFile
	    	if (typeof bodyFileName != "undefined" && bodyFileName != "") {
	    		$.get(resourcesPath + bodyFileName, success = function(data, textStatus,
	    				jqXHR) {
	    			_editor.setValue(jqXHR.responseText);
	    		});
	    	}
	    	
	    }
	}
}();