/*jslint node: true */

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) { // jshint ignore: line
    define(['underscore', 'fs', 'csvtojson'], factory); // jshint ignore: line
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('fs'), require('csvtojson'));
  }

}(this, function (_, fs, csvtojson) {

  'use strict';

  var file = process.argv[2];
  var Converter = csvtojson.Converter;
  var converter = new Converter({});
  var keskiArvot = {};

  if (!file) {
    console.log('Usage: node elomake.js file');
    process.exit();
  } else {
    file = __dirname + '/' + file;
  }

  converter.on('end_parsed', function(jsonArray) {
    // Muoto: {'kysymys': [0, 2, 3, 4]}
    var numeroArvot = {};
    jsonArray.forEach(function(obj) {
      for (var key in obj) {
        var value = obj[key];
        if (!isNaN(value) && value !== '') {
          key = key.replace('Arvioi seuraavia väittämiä asteikolla 1 = heikosti / ei ollenkaan, 4 = erinomaisesti / erittäin hyvin : ', '');
          if (key in numeroArvot) {
            numeroArvot[key].push(value);           
          } else {
            numeroArvot[key] = [];
            numeroArvot[key].push(value);
          }
        }
      }
    });
    for (var i in numeroArvot) {
        var sum = _.reduce(numeroArvot[i], function(memo, num) { return memo + num; }, 0);
        keskiArvot[i] = (sum / numeroArvot[i].length).toFixed(2);
      }
      printObject(keskiArvot);
  });

  fs.createReadStream(file).pipe(converter);

  function printObject(obj) {
    for (var i in obj) {
      console.log(i + ': ' + keskiArvot[i]);
    }
  }

}));