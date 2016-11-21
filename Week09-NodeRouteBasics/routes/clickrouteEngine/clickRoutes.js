var express = require('express');
var router = express.Router();

var distanceCalculator = require('./distanceCalculator.js');

/* GET home page. */
router.get('/getFeetInOneMile', function(req, res, next) {
    'use strict';
    console.log(distanceCalculator);
    try {
        var responseValue = distanceCalculator.getFeetInOneMile();

        res.send({
            result: 'success',
            value: responseValue
        });
    } catch (exc) {
        console.log(exc);
        res.send({
            result: 'fail',
            debug: 'Something went wrong :('
        });
    }

});

router.get('/getFeetFromMiles', function(req, res, next) {
    'use strict';
    try {
        console.log(req.query);
        if (req.query.miles !== undefined) {
            var numberOfMiles = parseFloat(req.query.miles);
            var responseValue = distanceCalculator.getFeetFromMiles(numberOfMiles);

            res.send({
                result: 'success',
                value: responseValue
            });
        }
    } catch (exc) {
        res.send({
            result: 'fail',
            debug: 'Something went wrong :('
        });
    }
});

router.post('/getCircumferenceFromRadius', function(req, res, next) {
    'use strict';
    try {
        if (req.body.radius !== undefined) {
            var radius = parseFloat(req.body.radius);
            var responseValue = {
                'radius': radius,
                'circumference': distanceCalculator.getCircumferenceFromRadius(radius)
            };
            console.log('calculated circumference ' + responseValue.circumference + ' from r ' + responseValue.radius);
            res.send({
                result: 'success',
                value: responseValue
            });
        }
    } catch (exc) {
        console.log(exc);
        res.send({
            result: 'fail',
            debug: 'Something went wrong :('
        });
    }
});

module.exports = router;
