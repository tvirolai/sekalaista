(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'fs'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('fs'));
  }

}(this, function (_, fs) {
  console.log("yeah");

  var kismet = ['jaha', 'no onhan se näin', 'röh röh'];
  var kizmet = _.map(kismet, function(entry) { return entry.toUpperCase(); });
  console.log(kizmet);


  return {
    fs: fs,
    _: _
  }
}));