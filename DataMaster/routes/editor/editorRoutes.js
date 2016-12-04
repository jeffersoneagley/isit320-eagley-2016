var express = require('express');
var router = express.Router();
var isAuthenticated = require('./../SignedIn');
var routerNpc = require('./npc/routerNpc');
var routerDb = require('./db/routerDb');
//var routerLevel = require('./map/routerLevel');

router.use('/', function(request, response, next) {
    'use strict';
    isAuthenticated.signedIn(request, response, next);
});

router.use('/npc', routerNpc);
//router.use('/level', routerMap);
router.use('/db', routerDb);

module.exports = router;
