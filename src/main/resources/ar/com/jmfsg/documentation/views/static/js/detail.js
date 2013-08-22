// Code for examples
function useExample(parameters, bodyFileName, resourcesPath) {
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
			codeMirrors['post'].setValue(jqXHR.responseText);
		});
	}
}

// Funcion para registrar los métodos de toggle de colapsables
function registerToggleFunction() {
	$('.toggle-parent').mouseover(function() {
		$(this).css('cursor', 'pointer');
	});

	$('.toggle-parent').click(function(e) {

		var header = $(this).children()
		
		//Backward compatibilty para el feature de los botones en los ejemplos
		if (header.children().length > 0) {  
			header = header.children()
			header = $(header[0])
		}

		if ($(e.target).is("div.toggle-child ul li a") || $(e.target).is("img")) {
			return;
		}

		$(this).parent().children('.toggle-child').slideToggle(400, function() {
			// Animation complete.
		});

		// TODO: JMF: Mejorar esto :P
		if (header.text().trim().charAt(0) == "+")
			header.text(header.text().replace("+", "-"));
		else
			header.text(header.text().replace("-", "+"));
	});

	$('.toggle-parent').each(function(index, e){
		if($(e).attr('closed')) {
			$(e).click()
		}
	})
}

// Metodo para realizar el post
function httpConsoleJson(url, method, resultName) {
	$.ajax({
		url : url,
		type : method.toUpperCase(),
		data : parseDynamicDate(codeMirrors[method.toLowerCase()].getValue()),
		contentType : "application/json; charset=utf-8",
        success: function (data, status, req) {
        	var result = $('#'+resultName);

            var value = '<p>From calling: <a href="' + url+ '">' + url + '</a></p>';
            value += '<code class="json"><pre>' + JSON.stringify(data, null, 1) + '</pre></code>';

            result.html(value);
        },
        dataType: 'json',
        error: function (req, status, e) {
        	var result = $('#'+ resultName);
            result.html('From calling: <a href="' + url + '">' + url + '</a> <br/>An Error Occured:<br/>' + e);
        }
	})
}


// Metodo para realizar post o put en otra ventana. Recibe 'put' o 'post' como method. Si data
function httpNewJson(url, method, sendData, OpenWindow) {
	sendData = (typeof sendData === "undefined") ? parseDynamicDate(codeMirrors[method.toLowerCase()].getValue()) : parseDynamicDate(sendData);
	OpenWindow = (typeof OpenWindow === "undefined") ? window.open("../jsonResult/", "_blank") : OpenWindow;
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
}

//Función para ejecutar un ejemplo sin utilizar la consola
function execute_example(mapping, preferredMethod, uriParams, bodyFileName, resourcesPath) {
	var toCall = "http://" + window.location.host + mapping;
	toCall = getToCall(toCall, uriParams);
	if (preferredMethod == "get") {
		OpenWindow = window.open(toCall, "_blank");
	} else if (preferredMethod == "post" || preferredMethod == "put") {
		var fileName = bodyFileName;
		var OpenWindow = window.open("../jsonResult/", "_blank");
		var request = $.get(resourcesPath + fileName, success = function(data, textStatus,
				jqXHR) {
			httpNewJson(toCall, preferredMethod, jqXHR.responseText, OpenWindow);
		})
		request.error(function(jqXHR, textStatus, errorThrown) {
		  if (textStatus == 'timeout')
		    console.log('The server is not responding');

		  if (textStatus == 'error')
		    console.log('errorThrown');

		  // Etc
		});
	}
}

//Función que dado un mapping y un diccionario { "varName" : "varValue" } genera el string REST para el get
function getToCall(toCall, params) {
    var firstP = true;

    for (var key in params) {
        var value = dynamicDate(params[key]);

        if (!value) continue;

        var newCall = replace(toCall, '{' + key + '}', encodeURIComponent(value));

        if (newCall == toCall) {
            toCall = toCall + (firstP ? '?' : '&') + key + '=' + encodeURIComponent(value);
            firstP = false;
        } else {
            toCall = newCall;
        }
    }
    return toCall;
}

var replace = function (text, target, replaceWith) {
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
