default_tax_rate = 0.0625

calculateTotal = (sub_total, rate = default_tax_rate) ->
	tax = sub_total * rate
	sub_total + tax

val = 100

console.log "What is the total of $#{val} worth of shopping?"
console.log "The total is #{calculateTotal(val)}"

val = 200

console.log "What is the total of $#{val} worth of shopping?"
console.log "The total is #{calculateTotal(val, 0.1)}"

defaultRate = ->
	0.2

console.log "Testataan siten, että oletusveroprossa on 20 %: $#{calculateTotal(val, defaultRate())}"