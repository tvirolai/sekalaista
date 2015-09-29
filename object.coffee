olio = 
	nimi: "Jani"
	ika: 66
	seksuaalisuus: "homo"
	kuvaus: ->
		"#{@nimi}, #{@ika}-vuotias #{@seksuaalisuus}"

console.log olio.ika
console.log olio.kuvaus()

sukupuoli = "interseksuaali"
pissan_haju = "pistävä"

# Huom kaarisulut

olio2 = {
	sukupuoli
	pissan_haju
	kuvaus: ->
		"#{@sukupuoli}, jonka pissan haju on #{@pissan_haju}"
	}

console.log olio2.kuvaus()
olio.pissan_haju = olio2.pissan_haju
console.log olio.pissan_haju