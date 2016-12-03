/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = {};

EX.repeatFunc = function (times, func, args) {
  var r = [];
  if (!args) { args = []; }
  while (r.length < times) { r[r.length] = func.apply(null, args); }
  return r;
};


EX.swapProp = function (obj, key, val) {
  var old = obj[key];
  obj[key] = val;
  return old;
};


EX.invoCnt = function (func, obj) {
  var n = 0, g = function () {
    n += 1;
    return func.apply(this, arguments);
  };
  if (obj) { func = EX.swapProp(obj, func, g); }
  g.used = function () { return n; };
  g.reset = function () { n = 0; };
  return g;
};














module.exports = EX;
