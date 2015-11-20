/* jshint node: true */

// Skripti lukee kaikki PIKIn tietueista löytyneet YKL-luokat, hakee niille määritelmät Verkko-YKL:sta ja kirjoittaa tiedostoon.
'use strict';

var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs');
var _ = require('underscore');

var out = fs.createWriteStream('YKL-luokat_avattu.txt');

var codeArray = [];

fs.readFile('YKL-luokat.txt', 'utf-8', function (err, data) {
  var splitData = data.split('\n');
  splitData.forEach(function (line) {
    var code = line.trim().split(' ')[1];
    codeArray.push(code);
  });
  codeArray = _.filter(codeArray, function (item) { return /[0-9]/.test(item); });
  getAndWriteDefinition(codeArray.reverse());
});

function getAndWriteDefinition(array) {
  var code = array.pop();
  getDefition(code);
  setTimeout(function() {
    if (codeArray.length > 1) { getAndWriteDefinition(codeArray); }
    else { console.log('Done!'); process.exit(); }
  }, 5000);
}

function getDefition(field) {
  var url = parseUrl(field);
  request(url, function (err, res, body) {
    if (err) throw err;
    else {
      var $ = cheerio.load(body);
      var definition = $( '#ctl00_body_ctl00_main_ctl00_sectionTitle > h1' ).text();
      console.log(definition);
      out.write(definition + '\n');
    }
  });
}

function parseUrl(field) {
  return 'http://ykl.kirjastot.fi/fi-FI/luokat/?MinClassNumber=' + field + '&MaxClassNumber=' + field + '&ClassNumber=' + field;
}