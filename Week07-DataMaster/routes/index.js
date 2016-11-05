var express = require('express');
var router = require('./couchMenu/couchRouteMaster', './couch/Couch.js');

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        'title': 'Jefferson\'s maze master control',
        'subtitle': 'For editing game levels and items'
    });
});

module.exports = router;
