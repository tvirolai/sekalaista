lista = ["Vittu", "kusettaa", "naapurissa on homoja", "tööt", "öhö öhö", "Hän on playboy"]
[pimpero, keskialue..., loppu] = lista
console.log "Pimpero: #{pimpero}"
console.log "keskialue: #{keskialue}"
console.log "loppu: #{loppu}"

lista = [-1..999]
lista[1..4] = "a"
console.log lista[0..5]