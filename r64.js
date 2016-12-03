/*jslint indent: 2, maxlen: 80 */
/* -*- tab-width: 2 -*- */

function rand64(opt) {
  'use strict';
  if ((opt === undefined) || (+opt === opt)) { return rand64.dflt(opt); }
  return rand64.factory(opt);
}

(function () {
  'use strict';
  var EX = rand64;

  function tapOr(x, f) { return ((f && f(x)) || x); }

  EX.charsets = tapOr({
    dec: '0123456789',
    az: 'abcdefghijklmnopqrstuvwxyz',
    AZ: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  }, function (cs) {
    cs.base64 = cs.AZ + cs.az + cs.dec + '+/';
    cs.url = '-_' + cs.base64;
  });

  function strip0dot(s) { return (s.slice(0, 2) === '0.' ? s.slice(2) : s); }

  EX.makeRandPool = function (rng, base) {
    base = (+base || 8);
    var buf = '', pool = {
      rng: (typeof rng === 'function' ? rng : Math.random),
      draw: function draw(len) {
        len = (+len || 1);
        while (buf.length < len) {
          buf += strip0dot(pool.rng().toString(base));
        }
        var s = buf.slice(0, len);
        buf = buf.slice(len);
        return s;
      },
    };
    return pool;
  };

  function ifShortAdd(x, min, add) {
    if (!x) { return add; }
    if (+x.length >= min) { return x; }
    return (String(x) + add);
  }

  EX.custom = function (opt) {
    opt = (opt || false);
    var cs = ifShortAdd(opt.charset, 64, EX.charsets.base64),
      rp = (opt.randPool || EX.makeRandPool()),
      dfltLen = (+opt.len || 8);
    return function rand64custom(len, chs) {
      chs = ifShortAdd(chs, 64, cs);
      return rp.draw((+len || dfltLen) * 2).replace(/\d\d/g,
        function (x) { return chs[parseInt(x, 8)]; });
    };
  };









  EX.dflt = EX.custom(false);

  ((typeof module === 'object') && (typeof (module || false).exports
    === 'object') && module).exports = EX;
  /*globals define:true*/
  if ((typeof define === 'function') && define.amd) { define(EX); }
}());
