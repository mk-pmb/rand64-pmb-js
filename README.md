
<!--#echo json="package.json" key="name" underline="=" -->
rand64-pmb
==========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Waste less randomness when generating random sequences of the first 64
characters of your alphabet.
<!--/#echo -->

A lot of modules out there just `modulo(random, alphabet.length)`,
which wastes a lot of randomness to duplicate choices.
Especially in cases where the to-be-used prefix of your alphabet is
at most 36 characters long, or (in this module's case) is a square number,
you can generate digits more easily and less wasteful using JavaScript
numbers' `.toString()` method, and keep unused digits for later.

On my development machine, one random number usually produces
[8 to 9 random characters](test/count-cmp.js), so this module drains
my randomness pool a low slower than a naive implementation.


Usage
-----

For more details, see the [test/](test/) directory.

<!--#include file="test/howto.js" start="  //#r" stop="  //#e"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="20" -->
```javascript
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
```
<!--/include-->




<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
