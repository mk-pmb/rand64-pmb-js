/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var repeat = require('./lib-util').repeatFunc;

function howto(require) {
  //#r
  var rand64 = require('rand64-pmb'), urlSafe;
  function demo(func, args) { console.log(repeat(4, func, args)); }

  demo(rand64, [ /* no arguments */ ]);
  // example output: [ 'HqWLD2En', 'qCqip+1T', 'em/kSMNZ', 'KkkPsb9U' ]

  demo(rand64, [ 3 ]);
  // ex. [ '+ip', '9qx', 'gOz', 'Fb0' ]

  urlSafe = rand64.custom({ charset: rand64.charsets.url, len: 12 });
  demo(urlSafe, []);
  // ex. [ '9qTssF8_qUIY', 'LU-zHa_0y1rZ', 'UVCFa2d2ljPy', 'q9QF9DDNjW-7' ]

  // If the alphabet is too short, the base64 alphabet is appended, so these
  // parameters are effectively the same as in the previous exmaple:
  urlSafe = rand64.custom({ charset: '-_' });
  demo(urlSafe, [ 12 ]);
  // ex. [ 'isKpZpAaNM-I', 'h-PqEoSa_uki', '0-lmKvH1WFt-', 'Qqkwley8y1KK' ]
  //#e
}

















module.exports = { repeat: repeat, howto: howto };
if (require.main === module) { howto(require); }
