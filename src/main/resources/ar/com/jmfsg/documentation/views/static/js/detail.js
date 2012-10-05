// Code for examples
function useExample(parameters, postFileName) {
	// Lleno la consola get si hay parámetros para usar
	if (typeof parameters != undefined && parameters != []) {
		var paramsKeys = Object.keys(parameters);
		for ( var i = 0; i < paramsKeys.length; i++) {
			var name = paramsKeys[i];
			var field = document.getElementById('p-' + name);
			field.value = parameters[paramsKeys[i]];
		}
	}

	// Lleno la consola post si hay nombre de postFile
	if (typeof postFileName != "undefined" && postFileName != "") {
		$.get("../../res/" + postFileName, success = function(data, textStatus,
				jqXHR) {
			myCodeMirror.setValue(data);
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

		if ($(e.target).is("div.toggle-child ul li a")) {
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
}

// Metodo para realizar el post
function postConsoleJson(url) {
	$.ajax({
		url : url,
		type : "POST",
		data : myCodeMirror.getValue(),
		contentType : "application/json; charset=utf-8",
		dataType : "json",
	})
}