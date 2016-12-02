/**
 * @name Couch
 * @author Charlie Calvert
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');

var setServer = require('../../src/SetServer/set-server-couch');

var nano = require('nano')(setServer.serverUrl);

var dbNames = {
    'session': 'couch-session-eagley',
    'game': 'game-data-eagley'
};

var myDbUtilities = {
    npc: require('./controller/DbControllerNpc')(),
    db: require('./controller/DbControllerDb')()
};

var insert = require('./CouchInsert')(router, nano, dbNames.game);
var views = require('./CouchViews')(router, nano, dbNames.game);
var designDocs = require('./CouchDesignDocs')(router, nano, dbNames.game);
var attach = require('./CouchAttach')(router, nano, dbNames.game);
var couchBulk = require('./CouchBulk')(router, dbNames.game, setServer.serverUrl);

var couchRouteMaster = require('./routemaster/CouchRouteMaster')(router, nano, dbNames.game, myDbUtilities);

router.get('/databaseName', function(request, response) {
    'use strict';
    console.log('\/databaseName called.');
    response.send({
        'Result': dbName
    });
});

router.get('/listDb', function(request, response) {
    'use strict';
    nano.db.list(function(err, body) {
        if (err) {
            throw err;
        }
        response.send(body);
        body.forEach(function(db) {
            console.log(db);
        });
    });
});

router.get('/createDb', function(request, response) {
    'use strict';
    if (request.query.dbName) {

        console.log('create called.');
        nano.db.create(dbName, function(err, body) {
            if (!err) {
                console.log(body);
                response.status(200)
                    .send(body);
            } else {
                console.log('Could not create database');
                console.log(err);
                response.status(err.statusCode)
                    .send(err);
                return;
            }
        });
    } else {
        response.status(504)
            .send('fail no db specified');
    }
});

router.get('/deleteDb', function(request, response) {
    'use strict';
    nano.db.destroy(request.query.dbName, function(err, body) {
        if (err) {
            console.log(err);
            response.status(err.statusCode)
                .send(err);
        } else {
            response.send(body);
        }
    });
});
module.exports = router;
