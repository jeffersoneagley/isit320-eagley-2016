var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        pageTitle: 'Main Page',
        programTitle: 'Week10SecondMixin'
    });
});

module.exports = router;
