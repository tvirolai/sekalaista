/*jslint node: true */

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {  // jshint ignore: line
    define(['underscore', 'fs'], factory);  // jshint ignore: line
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('fs'));
  }

}(this, function (_, fs) {

  'use strict';

  var inputfile = '/home/tuomo/Työpöytä/indeksejä/tab11_word';
  var indexes = {
    'WRD': [],
    'WTI': [],
    'WAU': [],
    'WPU': [],
    'WSU': [],
    'WSM': [],
    'WPL': [],
    'WYR': [],
    'WTU': [],
    'WKI': [],
    'SYS': [],
    'ISBN': [],
    'ISSN': [],
    'TIT': [],
    'AUT': [],
    'SUB': [],
    'SRS': [],
    'SICI': [],
    '028': []
  };

  fs.readFile(inputfile, 'utf-8', function(err, data) {
    var dataLineByLine = data.split('\n');
    dataLineByLine.forEach(function(line) {
      //console.log(line);
      var fieldCode = line.substring(0,5);
      var subFields = line.substring(25, 42).trim();
      var indexCodes = line.substring(53).trim().split(' ');
      indexCodes = _.filter(indexCodes, function(item) { if (/[a-z0-9]/i.test(item) && /!/.test(item) === false ) { return item; }});
      if (fieldCode !== '' && /!/.test(fieldCode) === false) {
        indexCodes.forEach(function(index) {
          if (indexes[index]) {
            indexes[index].push(fieldCode + ' (' + subFields + ')');
          }
        });
      }
    });
  for (var key in indexes) {
    var propertiesAsString = key + ': ';
    var properties = _.uniq(indexes[key]).sort();
    properties.forEach(function(item, i) {
      if (i !== 0) {
        propertiesAsString += ', ';
      }
      propertiesAsString += item;
      if (i + 1 === properties.length) {
        propertiesAsString += '\n';
      }
    });
    console.log(propertiesAsString);
  }
  });
}));