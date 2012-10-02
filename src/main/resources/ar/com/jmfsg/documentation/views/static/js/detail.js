// Code for examples
function useExample(parameters) {
	var paramsKeys = Object.keys(parameters);
	for (var i = 0; i < paramsKeys.length; i++) {
		var name = paramsKeys[i];
		var field = document.getElementById('p-'+name);
		field.value = parameters[paramsKeys[i]];
	}
}

function registerToggleFunction() {
	$('.toggle-parent').mouseover(function () {
				$(this).css('cursor', 'pointer');
		});
		
        $('.toggle-parent').click(function(e) {
        
          var header = $(this).children()
        
       	  if($(e.target).is("div.toggle-child ul li a")) {
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

