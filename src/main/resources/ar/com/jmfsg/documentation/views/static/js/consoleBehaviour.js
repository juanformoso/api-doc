var consoleBehaviour = function() {
	var _host = null;
	var _mappings = null;
	var _parameters = null;
	var _editor = null;

	return {
		build : function (host, mappings, parameters, editor) {
			_host = host;
	    	_mappings = mappings;
	    	_parameters = parameters;
	    	_editor = editor;
	    },
		
		execute : function (method) {
			var toCall = this.getToCall(_mappings[method], _parameters)
			this.httpNewJson(toCall, method)
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
	        var toCall = _host + toCall;
	
	        withParams = this.flattenParameters(withParams);
	        
	        var firstP = true;
	
	        for (var i = 0; i < withParams.length; i++) {
	            var value = $('#p-' + withParams[i].name).val();
	            value = dynamicDate(value);
	
	            if (!value) continue;
	
	            var newCall = this.replace(toCall, '{' + withParams[i].name + '}', encodeURIComponent(value));
	
	            if (newCall == toCall) {
	                toCall = toCall + (firstP ? '?' : '&') + withParams[i].name + '=' + encodeURIComponent(value);
	                firstP = false;
	            } else {
	                toCall = newCall;
	            }
	        }
	        return toCall;
	    },
	    httpNewJson: function(url, method) {
	    	sendData = parseDynamicDate(editor.getValue())  
	    	OpenWindow = window.open(url, "_blank")
	    	$(OpenWindow).ready( function() {
	    		$.ajax({
	    			url : url,
	    			type : method.toUpperCase(),
	    			data : sendData,
	    			contentType : "application/json; charset=utf-8",
	    	        success: function (data, status, req) {
	    	    		OpenWindow.document.write(JSON.stringify(data, null, 1))
	    	    		OpenWindow.document.close()
	    	        },
	    	        dataType: 'json',
	    	        error: function (req, status, e) {
	    	            OpenWindow.document.write('From calling: ' + url + ' An Error Occured: ' + e +"\m");
	    	            OpenWindow.document.write("Request:\n");
	    	            OpenWindow.document.write(sendData);
	    	            OpenWindow.document.close();
	    	        }
	    		})
	    	});
	    },
	    flattenParameters: function(withParams, appender) {
        	if (typeof appender === 'undefined') {
        		appender = [];
        	}
        	for (var i = 0; i < withParams.length; i++) {
    			appender[appender.length] = withParams[i]
    			if (withParams[i].children) {
    				this.flattenParameters(withParams[i].children, appender);
    			}
        	}
        	return appender;
        }
	}
}();