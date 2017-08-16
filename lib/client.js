'use strict';


require('seneca')()
    .client()
    .act('role:math,cmd:sum,left:1,right:2', (err, result) => {
    
        console.log('client result');
        console.log(err);
        console.log('result ' + result);
        console.log('result.answer ' + result.answer);
        console.log('result keys: ' + Object.keys(result));
    })
