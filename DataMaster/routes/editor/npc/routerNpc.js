var express = require('express');
var router = express.Router();
var setServer = require('../../../src/SetServer/set-server-couch');
var dbControllerNpc = require('./DbControllerNpc')();
var nano = require('nano')(setServer.serverUrl);

var gameserver = 'game_data_eagley';

var buildRoutes = function() {
    'use strict';
    var routerNpcDb = require('./routerNpcDb');
    routerNpcDb(nano, router, gameserver);

    router.get('/home', function(request, response) {
        console.log('getting db from db');
        try {
            nano.db.use(gameserver)
                .view('npcObjects', 'docNpcAllByDocID', function(err, result) {
                    var npcPageParams = {
                        'npcList': []
                    };
                    if (!err && result && result.rows) {
                        npcPageParams = {
                            'npcList': result.rows
                        };
                    }
                    console.log('response from db ' + err);
                    console.log(JSON.stringify(result));
                    response.render('editor/npc/home.pug', npcPageParams);
                });
        } catch (exc) {
            console.log(exc);
        }
    });

    router.get('/update', function(request, response) {
        try {
            console.log(request.query);
            if (request.query.changes !== undefined &&
                request.query.id !== undefined && request.query.rev !== undefined) {
                var changes = request.query.changes;
                console.log('pushing update');
                dbControllerNpc.UpdateNpcEntry(
                        request.query.id,
                        request.query.rev,
                        changes, nano, gameserver,
                        function(err, result) {
                            console.log('attempted insert, err: ' + err);
                            response.render('editor/npc/npcUpdatedSingle.pug', {
                                'result': result,
                                'changes': changes
                            });
                        })
                    .fail(function(err, result) {
                        response.send({
                            'result': result,
                            'err': err
                        });
                    });
            } else {
                console.log('fail');
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

    //router.use('/db', routerNpcDb.router);

    module.exports = router;
};
buildRoutes();
