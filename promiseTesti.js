(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'fs', 'q', 'readline'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('fs'), require('q'), require('readline'));
  }

}(this, function (_, fs, Q, readline) {

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

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
  
  rf('testi.txt', 'utf-8')
  .then(function(data) {
    console.log(data);
  })
  .then(function() {
    rl.question('Miltäs nyt tuntuu? ', function(vastaus) {
      console.log('Jaa, ei kiinnosta jos on \'' + vastaus.toLowerCase() + '\'.');
      rl.close();
    });
  })
  .done();
}));