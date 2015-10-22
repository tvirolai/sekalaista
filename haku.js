/* jshint node: true */
'use strict';

var file = process.argv[2];
var readline = require('readline');
var fs = require('fs');

var serialOrMonograph = (function() {
  var recordCount = 0;
  var lineCount = 0;
  var currentRecord = '';
  var problematicRecords = [];
  var currentRecordrecordContent = {};
  return {
    increment: function (record) {
      var id = record.slice(0,9);
      ++lineCount;
      if (id !== currentRecord) {
        currentRecord = id;
        ++recordCount;
        if (currentRecordrecordContent.hasOwnProperty('008/7m') || currentRecordrecordContent.hasOwnProperty('020') && currentRecordrecordContent.hasOwnProperty('022')) {
          problematicRecords.push(currentRecordrecordContent['022']);
        }
        currentRecordrecordContent = {};
      }
    },
    inputLine: function (line) {
      var id = line.slice(0,9);
      var field = line.slice(10,13);
      var content = line.slice(18);
      if (field === '020') {
        currentRecordrecordContent['020'] = id;
      } else if (field === '022') {
        currentRecordrecordContent['022'] = id;
      } else if (field === 'LDR') {
        var code = content.slice(7,8);
        if (code === 'm') {
          currentRecordrecordContent['008/7m'] = id;
        }
      }
    },
    returnProblematic: function() {
      return problematicRecords;
    }
  };
})();

var rl = readline.createInterface({
  input: fs.createReadStream(file)
});

rl.on('line', function (line) {
  serialOrMonograph.increment(line);
  serialOrMonograph.inputLine(line);
});

rl.on('close', function () {
  var result = serialOrMonograph.returnProblematic();
  console.log(result.length + ' records found');
  console.log(result);
});