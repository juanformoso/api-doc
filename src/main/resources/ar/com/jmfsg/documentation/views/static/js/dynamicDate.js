/* Biblioteca para el parseo de fechas dinámicas
 * El parseo de fechas dinámicas consiste en reemplazar cualquier string que matchee una fecha dinámica
 * por la fecha correspondiente. Un string que matchee una fecha dinámica es aquél que este cerrado entre
 * %d d%. El languaje de fechas dinámicas se define de la siguiente forma:
 * 
 * DYNAMIC_DATE: %d DATE_INFO d%
 * DATE_INFO: DATE_STR | DATE_STR OPT
 * DATE_STR: now | dateStr
 * OPT: MODIF | FORMAT | MODIF FORMAT 
 * MODIF: (\+(\d)+[dmy])+   // Expresión regex que matchea los modificadores 
 * FORMAT: %f formatStr f%
 * 
 * > 'dateStr' es cualquier string parseable por new Date() de js.
 * > 'formatStr' es un string con un formato compatible con la siguiente documentación: http://fisforformat.sourceforge.net/
 * Si se encuentra %f f%, la fecha se devuelve como un string formateada de esa forma, sino se devuelve como long.
 * 
 * Ejemplos:
 * 
 * 	%d now +1d+2y d% :: Imprime la fecha de mañana más un año, con long
 *  %d 1-1-1990 +1d+2y %f yyyy-MM-dd f% d% :: Imprime 2-1-1992
 *  %d 2-1-1990 %fyyyyMMf% d%,%d 4-1-1990 %fyyyyMMf% d% :: Imprime 199002,199002
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

//
function dynamicDate( str ) {
	var re = /%d.*?d%/i
	var cpy = str
	while (re.test(cpy)) {
		var toReplace = cpy.match(re)[0]
		var replace = processDate( toReplace )
		cpy = cpy.replace(toReplace, replace)
	}
	return cpy
}

function processDate( DYNAMIC_DATE ) {
	DATE_INFO = DYNAMIC_DATE.match(/%d(.*)d%/i)[1]
	
	var FORMAT_RE = /%f.*f%/i
	var FORMAT = null
	if (FORMAT_RE.test(DATE_INFO)) {
		FORMAT = DATE_INFO.match(FORMAT_RE)[0] //Extraigo el formato
		DATE_INFO = DATE_INFO.replace(FORMAT, "")
	}
	
	modifList = []
	var MODIF_RE = /[+-]\d*[dmy]/i
	while (MODIF_RE.test(DATE_INFO)) { //Junto los acumuladores
		var MODIF = DATE_INFO.match(MODIF_RE)[0]
		DATE_INFO = DATE_INFO.replace(MODIF, "")
		modifList[modifList.length] = MODIF
	} //DATE_INFO ahora es DATE_STR
	
	//Parseo DATE_STR
	var d = new Date()
	d = parseDateConst(DATE_INFO)
	
	//Aplico modificadores
	for (var i = 0; i < modifList.length; i++) {
		applyModifier(d, modifList[i])
	}
	
	return formatDate(d, FORMAT)
}

function parseDateConst( DATE_STR ) {
	DATE_STR = DATE_STR.trim()
	if (DATE_STR == "now") {
		return new Date()
	}
	return new Date(DATE_STR.trim())
}

function applyModifier( d, modif ) {
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
	
	d.setDate(d.getDate() + dayModif)
	d.setMonth(d.getMonth() + monthModif)
	d.setFullYear(d.getFullYear() + yearModif, d.getMonth(), d.getDate())
}

function formatDate( d, formatStr ) {
	if ( formatStr == null ){
		return d.getTime().toString()
	}
	var formatStr = formatStr.match(/%f(.*)f%/i)[1]
	return d.f(formatStr.trim())
}

// Dado un string, si contiene %d devuelve la fecha en millisegundos con las modificaciones realizadas.
// Sino devuelve el mismo string
function dynamicDate_depricated( str ) {
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