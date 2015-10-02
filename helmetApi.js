'use strict';

var request = require('request');

var query = process.argv[2];

var page = '';

if (process.argv[3]) {
  page = process.argv[3];
} else {
  page = 1;
}

var querystring = 'http://metadata.helmet-kirjasto.fi/search/title.json?query=' + query + '&page=' + page;

var options = {
  url: querystring
};

request(options, function(err, res, body) {
  if (err) throw err;
  var info = JSON.parse(body);
  var firstOnPage = 1 + ((info.current_page - 1) * info.per_page);
  var lastOnPage = firstOnPage + info.per_page - 1;
  if (info.total_entries < lastOnPage) {
    lastOnPage = info.total_entries;
  }
  console.log('');
  info.records.forEach(function(d, i) {
      if (d.author !== '') {
      console.log(firstOnPage + i + '. ' + d.author + ': ' +   d.title + ' (' + d.year + ')');
    } else {
      console.log(firstOnPage + i + '. ' + d.title + ' (' + d.year + ')');
    }
  });
  console.log('\nThese are the results ' + firstOnPage + '-' + lastOnPage + '/' + info.total_entries + '.');
});