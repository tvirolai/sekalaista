(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'fs', 'q'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('fs'), require('q'));
  }

}(this, function (_, fs, Q) {

  console.log("yeah");
  Q.nfcall(fs.readFile, 'testi.txt', 'utf-8')
  .then(function(data) {
    console.log("Luettu: " + data);
  })
  .fail(function(err) {
    console.log("Error: " + err);
  })
  .done();
  console.log("Yo!");

  Q.fcall(function() {
    console.log("moi");
    return 10;
  });

  var rf = Q.denodeify(fs.readFile);
  rf('01-09-header.cpp', 'utf-8')
  .then(function(data) {
    console.log(data);
  }).done();

}));