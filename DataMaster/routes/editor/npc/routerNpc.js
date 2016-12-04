var express = require('express');
var router = express.Router();
var setServer = require('../../../src/SetServer/set-server-couch');

var dbControllerNpc = require('./DbControllerNpc');
var nano = require('nano')(setServer.serverUrl);
//var isAuthenticated = require('../SignedIn');

var gameserver = 'game_data_eagley';

var buildRoutes = function() {
    'use strict';

    router.get('/home', function(request, response) {
        console.log('getting db from db');
        try {
            nano.db.use(gameserver)
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

    router.get('/update/:id', function(request, response) {
        try {
            if (request.query.changes !== undefined && request.params.id !== undefined) {
                var changes = request.query.changes;
                dbControllerNpc(request.params.id, changes, nano, gameserver, function(err, result) {
                    response.send({
                        'result': result,
                        'err': err
                    });
                });
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    });

    router.get('/edit/:id', function(request, response) {
        try {
            console.log('called edit for docid ' + request.params.id);
            nano.db.use(gameserver)
                .get(request.params.id, function(err, result) {
                    console.log('Error from couch:');
                    console.log(err);
                    response.render('editor/npc/npcEditSingle.pug', {
                        'npc': result
                    });
                });
        } catch (e) {
            console.log(e);
        } finally {

        }
    });
    module.exports = router;
};
buildRoutes();
