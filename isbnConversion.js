/* jshint node: true */
// Converts ISBN10 -numbers to ISBN13 and vice versa

'use strict';

var code = process.argv[2];

if (!code) {
  console.log('Usage: node isbnConversion.js code');
  process.exit();
}

if (code.indexOf('-') > -1) {
  var codeAsNumbers = code.split('-');
  codeAsNumbers = codeAsNumbers.join('');
}

if (codeAsNumbers.length === 10) {
  var isbn13 = '978-' + code.slice(0, code.length - 1) + returnISBN13CheckDigit(codeAsNumbers);
  console.log('Converted ISBN10 to ISBN13:\n' + code + ' -> ' + isbn13);
} else if (codeAsNumbers.length === 13) {
  var isbn10 = code.slice(3);
  if (isbn10.slice(0,1) === '-') {
    isbn10 = isbn10.slice(1);
  }
  isbn10 = isbn10.slice(0, isbn10.length - 1) + returnISBN10CheckDigit(codeAsNumbers);
  console.log("Converted ISBN13 to ISBN10:\n" + code + ' -> ' + isbn10);
} else {
  console.log('Unrecognized ISBN.');
}

function returnISBN10CheckDigit(input) {
  var checkDigit = 0;
  var modulo = 0;
  var code = input.slice(3, input.length - 1);
  code = code.split('');
  for (var i = 0; i < code.length; i++) {
    modulo += (10 - i) * code[i];
  }
  checkDigit = 11 - (modulo % 11);
  if (checkDigit > 10) {
    checkDigit = checkDigit % 11;
  }
  
  if (checkDigit === 10) {
    checkDigit = 'X';
  }
  return checkDigit.toString();
}

function returnISBN13CheckDigit(input) {
  var checkDigit = 0;
  input = input.toString();
  input = '978' + input;
  input = input.split('');
  input.pop();
  for (var i = 0; i < input.length; i++) {
    var number = Number(input[i]);
    if (i % 2 === 0) {
      checkDigit += number * 1;
    } else {
      checkDigit += number * 3;
    }
  }
  checkDigit = 10 - (((checkDigit / 10) % 1).toFixed(1) * 10);
  return checkDigit.toString();
}