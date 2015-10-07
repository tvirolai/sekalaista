/*jslint node: true */

'use strict';

var fs = require('fs');
var _ = require('underscore');

var stats = {
  'done': 0,
  'todo': 0,
  'total': 0,
  'donePercentage': 0,
  'todoPercentage': 0
};

fs.readFile('./tmc.txt', 'utf-8', function(err, data) {
  if (err) throw err;
  data = data.split('\n');
  var done = data[0].split(' ');
  done = _.filter(done, function(item) { if (!isNaN(item)) { return item; } });
  var todo = data[1].split(' ');
  todo = _.filter(todo, function(item) { if (!isNaN(item)) { return item; } });
  stats.done = done.length;
  stats.todo = todo.length;
  stats.total = stats.done + stats.todo;
  stats.donePercentage = (stats.done / stats.total * 100).toFixed(1);
  stats.todoPercentage = (stats.todo / stats.total * 100).toFixed(1);
  printStats();
});

function printStats() {
  console.log('Tehty: ' + stats.done + '/' + stats.total + ' (' + stats.donePercentage + ' %)');
  console.log('Tekemättä: ' + stats.todo + '/' + stats.total + ' (' + stats.todoPercentage + ' %)');
}