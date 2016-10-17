var express = require('express');
var router = express.Router();

router.get('/Item01', function(request, response) {
    'use strict';
    var result = {
        'result': 'Success',
        'route': '/Item01',
        'message': 'The server sent me'
    };
    response.send(result);
});

router.get('/Item02', function(request, response) {
    'use strict';
    var result = {
        'result': 'Success',
        'route': '/Item02',
        'message': 'The server sent me'
    };
    response.send(result);
});

router.get('/Item03', function(request, response) {
    'use strict';
    var result = {
        'result': 'Success',
        'route': '/Item03',
        'message': 'The server sent me'
    };
    response.send(result);
});

/* GET home page. */
router.get('/', function(request, response) {
    'use strict';
    response.render('index', {
        title: 'Click Routes'
    });
});
module.exports = router;
