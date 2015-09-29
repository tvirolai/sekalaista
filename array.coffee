x = "X"
y = "Y"

console.log "x is #{x}"
console.log "y is #{y}"

[x, y] = [y, x]

console.log "x is #{x}"
console.log "y is #{y}"

lista = ["vittu", "moi", 666]
iterator = (array) ->
	for item in array
		console.log item
iterator(lista)
lista2 = [
	"kusettaa"
	"äiti tuu pyyhkimään"
	"kakka tulee"
	69
]
iterator(lista2)
if "kusettaa" in lista2
	console.log "Lista kakkosessa kusettaa"

unless "d" in lista
	console.log "Listassa ei ole deetä"