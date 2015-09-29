today = "tiistai"
if today != "sunnuntai"
	console.log "Ei ole pyhäpäivä, huh!"

today = "maanantai"
if today is "maanantai"
	console.log "Tänään on maanantai. Jaahas, viikko alkaa, töihin ja kahvia koneeseen, ehe ehe!" 
else 
	console.log "Tänään ei ole maanantai, huh."

unless today is "perjantai"
	console.log "Ei lopu vielä työviikko!"

console.log "Tänään on maanantai" if today is "maanantai"