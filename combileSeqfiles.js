/*jslint node: true */

// Ohjelma lukee CVS-dumpin hakemistoista kaikki seq-tiedostot ja yhdistää ne yhteen massiiviseen tiedostoon.
// Käyttö: node combineSeqFiles.js hakemisto luotavatiedosto

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) { // jshint ignore: line
    define(['underscore', 'fs', 'walk'], factory); // jshint ignore: line
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('fs'), require('walk'));
  }

}(this, function (_, fs, walk) {

  'use strict';
  
  var directory = '';
  var outputFile = '';
  var files = [];
  var numberOfFiles = 0;
  var processedFiles = 0;

  if (!process.argv[3]) {
    console.log('Usage: node combineSeqfiles.js inputdir outputFile');
    process.exit();
  } else {
    directory = process.argv[2];
    outputFile = process.argv[3];
  }

  var wstream = fs.createWriteStream(outputFile);

  wstream.on('finish', function() {
    console.log('Done.');
  });

  var walker = walk.walk(directory, {followLinks: false});

  walker.on('file', function(root, stat, next) {
    files.push(root + '/' + stat.name);
    next();
  });

  walker.on('end', function() {
    files = _.filter(files, function(item) { return item.substring(item.length - 4) === '.seq'; });
    numberOfFiles = files.length;
    readAndStream(files);
  });

  function readAndStream(array) {
    if (array.length === 0) {
      console.log('Ready.');
    } else {
      var file = array.pop();
      ++processedFiles;
      fs.readFile(file, 'utf-8', function(err, data) {
        wstream.write(data);
        progressReport();
        readAndStream(array);
      });
    }
  }

  function progressReport() {
    if (processedFiles % 1000 === 0) {
      var percentage = (processedFiles / numberOfFiles * 100).toFixed(1);
      console.log('Processed ' + percentage + ' % of the found seqfiles (' + processedFiles + '/' + numberOfFiles + ')');
    }
  }
}));