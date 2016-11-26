/**
 * @name Couch
 * @author Charlie Calvert
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');

var servers = ['http://192.168.2.19:5984', 'http://10.0.2.5:5984', 'http://127.0.0.1:5984'];
var serverIndex = 1;
var nano = require('nano')(servers[serverIndex]);

var dbName = 'couch-session-eagley';
var docName = 'sessions';

var myDbUtilities = {
    npc: require('./controller/DbControllerNpc')(),
    db: require('./controller/DbControllerDb')()
};

var insert = require('./CouchInsert')(router, nano, dbName);
var views = require('./CouchViews')(router, nano, dbName);
var designDocs = require('./CouchDesignDocs')(router, nano, dbName);
var attach = require('./CouchAttach')(router, nano, dbName);
var couchBulk = require('./CouchBulk')(router, dbName, servers[serverIndex]);

var couchRouteMaster = require('./routemaster/CouchRouteMaster')(router, nano, dbName, myDbUtilities);

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
});

router.get('/deleteDb', function(request, response) {
    'use strict';
    nano.db.destroy(dbName, function(err, body) {
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
