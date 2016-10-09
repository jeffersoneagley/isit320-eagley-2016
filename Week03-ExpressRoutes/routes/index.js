var express = require('express');
var router = express.Router();

router.get('/read', function(request, response) {
    'use strict';
    response.send([{
        name: 'SarahLee'
    }, {
        name: 'Bob'
    }]);
});

router.get('/add', function(request, response) {
    'use strict';
    console.log('add method called');
    var myParams = request.query;
    console.log('The parameters are:', myParams);
    var operatorA = parseInt(myParams.operatorA),
        operatorB = parseInt(myParams.operatorB);
    if (!isNaN(operatorA) &&
        !isNaN(operatorB)
    ) {
        console.log('real numbers, doing math');
        var myResult = operatorA + operatorB;
        response.send({
            result: myResult
        });
    } else {
        response.send({
            failure: 'those values cannot be added!~'
        });
    }
});

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
