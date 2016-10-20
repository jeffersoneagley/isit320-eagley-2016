var express = require('express');
var router = express.Router();

router.get('/getIndex', function(req, res) {
    'use strict';
    console.log('getIndex called');
    console.log('Sorry, Charlie, this is broken!:( ');
    console.log(work.getData());
    res.send(myData);
});

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
//exports = router;
