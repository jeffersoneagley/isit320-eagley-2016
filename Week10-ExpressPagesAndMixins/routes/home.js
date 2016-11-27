var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    'use strict';
    res.render('home', {
        title: 'Isit320-Eagley',
        description: 'ExpressPagesAndMixins'
    });
});

module.exports = router;
