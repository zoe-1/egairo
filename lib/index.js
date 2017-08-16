'use strict';


require('seneca')()
    .use(require('./math.js'))
    .listen()


// curl -d '{"role":"math","cmd":"sum","left":1,"right":2}' http://localhost:10101/act
// {"answer":3}
