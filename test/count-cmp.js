/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function tapOr(x, f) { return ((f && f(x)) || x); }


var libUtil = require('./lib-util'), cntRand = libUtil.invoCnt('random', Math),
  rand64 = require('rand64-pmb');

libUtil.repeatFunc(100, function (memo) {
  var before = cntRand.used(), after;
  memo.chars += rand64(1);
  memo.total += 1;
  after = cntRand.used();
  if (after > before) {
    console.log({ 'rng#': after, newChars: memo.chars,
      newLen: memo.chars.length, total: memo.total });
    memo.chars = '';
  }
}, [{ chars: '', total: 0 }]);





















/*scroll*/
