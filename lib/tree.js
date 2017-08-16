'use strict';

require('seneca')()
    .use(require('./math.js'))
    .act('role:math,cmd:sum,left:1,right:2', console.log)
