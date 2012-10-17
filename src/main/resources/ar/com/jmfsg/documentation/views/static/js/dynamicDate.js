/* Biblioteca para el parseo de fechas dinámicas
 * Si un campo string tiene por substring %$d, se considera que todo lo que viene antes de %d es una fecha
 * y todo lo que viene después es un modificador de fecha.
 * Los modificadores de fecha tienen la siguiente forma:
 * 		-4d+1m-3y
 * 	Lo cual indica que a la fecha obtenida se le restan 4 días, se le suma 1 mes y se le restan 3 años
 * Además el modificador puede contener %now, lo que indica que la fecha a utilizar es la fecha actual.
 */

// Dado un string de json lo recorre en búsqueda de fechas dinámicas y devuelve otro string con las fechas modificadas
function parseDynamicDate( jsonStr ) {
	var json = $.parseJSON(jsonStr);
	return JSON.stringify( objDynamicDate(json) )
}

// Dado un objeto json lo recorre en búsqueda de fechas dinámicas y devuelve otro con las fechas modificadas
// Modifica el json original
function objDynamicDate( json ) {
	for (var k in json) {
		if (typeof json[k] == "string") {
			json[k] = dynamicDate(json[k])
		} else if (typeof json[k] == "object") {
			objDynamicDate( json[k] )
		}
	}
	return json
}

// Dado un string, si contiene %d devuelve la fecha en millisegundos con las modificaciones realizadas.
// Sino devuelve el mismo string
function dynamicDate( str ) {
	var re = new RegExp("%\\$d.*", "i")
	if (re.test(str)) {
		var date = str.split("%$d")[0]
		var modif = str.split("%$d")[1]
		if (modif.search("%now") >= 0) {
			date = new Date()
		} else { 
			date = new Date(date)
		}
		var reBase = "([+-]\\d+)"
		var dayRE = new RegExp(reBase + "d")
		var monthRE = new RegExp(reBase+"m")
		var yearRE = new RegExp(reBase+"y")
		
		var dayModif = 0
		var monthModif = 0
		var yearModif = 0
		
		if (dayRE.test(str)) {
			dayModif = parseInt(dayRE.exec(str)[1])
		}
		if (monthRE.test(str)) {
			monthModif = parseInt(monthRE.exec(str)[1])
		}
		
		if (yearRE.test(str)) {
			yearModif = parseInt(yearRE.exec(str)[1])
		}
		
		date.setFullYear(date.getFullYear() + yearModif, date.getMonth() + monthModif, date.getDate() + dayModif)
	} else {
		return str
	}
	return date.getTime()
}