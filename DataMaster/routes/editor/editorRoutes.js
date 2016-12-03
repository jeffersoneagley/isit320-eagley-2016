var express = require('express');
var router = express.Router();
var isAuthenticated = require('./../SignedIn');
var routerNpc = require('./npc/routerNpc');
var routerDb = require('./db/routerDb');
//var routerMap = require('./map/routerMap');

router.use('/npc', routerNpc);
//router.use('/map', routerMap);
router.use('/db', routerDb);

module.exports = router;
