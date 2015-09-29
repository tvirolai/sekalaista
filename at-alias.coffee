object = {
  name: 'Rauno'
  moikkaa: ->
    console.log "Moikka, #{@name}"
}
object.moikkaa()

console.log object.name
console.log @name