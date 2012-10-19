/* Biblioteca para el parseo de fechas dinámicas
 * Si un campo string tiene por substring %$d, se considera que todo lo que viene antes de %d es una fecha
 * y todo lo que viene después es un modificador de fecha.
 * Los modificadores de fecha tienen la siguiente forma:
 * 		-4d+1m-3y
 * 	Lo cual indica que a la fecha obtenida se le restan 4 días, se le suma 1 mes y se le restan 3 años
 * Además el modificador puede contener %now, lo que indica que la fecha a utilizar es la fecha actual.
 * El date resultado se devuelve como un long, salvo que se agregue una aclaración de formato:
 * 	%f str f%
 * Donde 'str' es un string con un formato compatible con la siguiente documentación: http://fisforformat.sourceforge.net/
 * Si se encuentra %f f%, la fecha se devuelve como un string formateada de esa forma.
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
		
		if (dayRE.test(modif)) {
			dayModif = parseInt(dayRE.exec(modif)[1])
		}
		if (monthRE.test(modif)) {
			monthModif = parseInt(monthRE.exec(modif)[1])
		}
		
		if (yearRE.test(modif)) {
			yearModif = parseInt(yearRE.exec(modif)[1])
		}
		
		date.setDate(date.getDate() + dayModif)
		date.setMonth(date.getMonth() + monthModif)
		date.setFullYear(date.getFullYear() + yearModif, date.getMonth(), date.getDate())
		
		var formatRE = new RegExp("%f(.+)f%")
		var formatStr = ""
		
		if (formatRE.test(modif)) {
			formatStr = formatRE.exec(modif)[1]
			return date.f(formatStr.trim())
		} else {
			return date.getTime()
		}
		
	} else {
		return str
	}
}