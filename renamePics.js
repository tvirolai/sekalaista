/* jshint node:true */

// Ohjelma siirtää argumenttina annettavan hakemiston kaikkien tiedostojen nimissä
// kameran luoman leiman tiedostonimen alkuun.

'use strict';

var fs = require('fs');
var prompt = require('prompt');

var properties = [
];
var directory = process.argv[2];

if (! directory) {
  console.log('Usage: node renamePics.js directory');
  process.exit();
}

fs.readdir(directory, function(err, files) {
  if (err) throw err;
  files.forEach(function(d) {
    var oldName = addPath(d);
    if (isPhoto(d)) {
      if (hasNoName(d)) {
        d = promptForName(d);
      }
      d = removeMultipleDots(d);
      d = removeSpaces(d);
      d = extensionToLowerCase(d);
      d = timeStampToBeginning(d);
      var newName = addPath(d);
      fs.rename(oldName, newName, function(err) {
        if (!err) {
          console.log('Renamed ' + oldName + ' to ' + newName);
        }
      });
    }
  });
});

function promptForName(file) {
  console.log("Want to append an address to the filename \'" + file + "\'? (y/n)");
  prompt.start();
  prompt.get()
}

function hasNoName(file) {
  return /P\d+\./i.test(file);
}

function addPath(file) {
  return __dirname + '/' + directory + file;
}

function isPhoto(file) {
  return (file.slice(-4).toLowerCase() === '.jpg') ? true : false;
}

function removeMultipleDots(file) {
  return file.replace(/\.\./g, '.');
}

function removeSpaces(file) {
  return file.replace(/\s/g, '_');
}

function extensionToLowerCase(file) {
  var array = file.split('.');
  if (array.length === 2) {
    return array[0] + '.' + array[1].toLowerCase();
  } else {
    console.log('Undefined: ' + file);
  }
  
}

function timeStampToBeginning(file) {
  if (file === undefined) {
    return false;
  }
  var array = file.split('.');
  if (array.length == 2) {
    var match = /P\d+/.exec(file);
    if (match === null) {
      match = /\d+/.exec(file);
    }
    // Jos leima löytyy muualta kuin tiedostonimen alusta, poistetaan se tiedostonimestä ja liitetään alkuun
    if (match.index !== 0) {
      file = file.substring(0, match.index);
      file = match[0] + '_' + file + '.' + array[array.length - 1];
    }
  }
  return file.replace(/_\./, '.');
}
