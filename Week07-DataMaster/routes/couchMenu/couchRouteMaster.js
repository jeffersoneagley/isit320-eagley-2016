var express = require('express');
var router = express.Router();

var couchRouteEditorNpc = require('./couchRouteEditorNpc')(router);

/* GET home page. */
router.get('/getCouchRoutes', function(request, response) {
    'use strict';
    console.log('getCouchRoutes called');
    var myRouteList = {
        'rows': [{
            'buttonLabel': 'NPCs',
            'route': '/editor/npc'
        }, {
            'buttonLabel': 'Levels',
            'route': '/editor/level'
        }, {
            'buttonLabel': 'Databases',
            'route': '/editor/db'
        }]
    };
    response.send(myRouteList);
});

module.exports = router;
