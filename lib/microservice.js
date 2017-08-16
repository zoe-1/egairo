'use strict';

require('seneca')()
    .use(require('./math.js'))
    .listen()
