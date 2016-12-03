var express = require('express');
var router = express.Router();
var setServer = require('../../../src/SetServer/set-server-couch');

var dbControllerNpc = require('./DbControllerNpc');
var nano = require('nano')(setServer.serverUrl);
//var isAuthenticated = require('../SignedIn');

var buildRoutes = function() {
    'use strict';
    router.get('/home', function(request, response) {
        console.log('getting db from db');
        try {
            nano.db.use('game_data_eagley')
                .view('npcObjects', 'docSortedById', function(err, result) {
                    console.log('response from db ' + err);
                    console.log(JSON.stringify(result));
                    response.render('editor/npc/home.pug', {
                        'npcList': result.rows
                    });
                });
        } catch (exc) {
            console.log(exc);
        }
    });
    module.exports = router;
};
buildRoutes();
