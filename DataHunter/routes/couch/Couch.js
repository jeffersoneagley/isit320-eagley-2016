/**
 * @name Couch
 * @author Charlie Calvert
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');

var setServer = require('../../src/SetServer/set-server-couch');

var nano = require('nano')(setServer.serverUrl);

var dbName = 'game_data_eagley';
var collectionName = 'npcObjects';

var insert = require('./CouchInsert')(router, nano, dbName);
var views = require('./CouchViews')(router, nano, dbName);
var attach = require('./CouchAttach')(router, nano, dbName);
var couchBulk = require('./CouchBulk')(router, dbName, setServer.serverUrl);
var couchFishLevelRouter = require('./CouchFishLevelRouter')(nano, dbName);

router.use('/level', couchFishLevelRouter);

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

router.get('/readNpcInitialSetupParameters', function(request, response) {
    'use strict';
    console.log('readNpcInitialSetupParameters called');
    // var url = 'http://localhost:5984/prog28202/_all_docs';

    var nanoDb = nano.db.use(dbName);
    try {
        nanoDb.view(collectionName, 'docNpcInitialSetupParameters', function(err, result) {
            console.log('response from db ' + err);
            console.log(result);
            if (!err) {
                console.log('success, processing result');
                console.log(result);
                //result.rows
            } else {
                console.log(err);
            }
            console.log(result);
            response.send(result);
        });
    } catch (exc) {
        console.log(exc);
    }
});

router.get('/readNpcQuestion', function(request, response) {
    'use strict';
    console.log('readNpcQuestion for NPC ' + request.query.npc_id);
    // var url = 'http://localhost:5984/prog28202/_all_docs';
    if (request.query.npc_id !== undefined) {
        var npc_id = request.query.npc_id;
        var nanoDb = nano.db.use(dbName);
        try {
            nanoDb.view(collectionName, 'docNpcAllByMapId', {
                keys: [parseInt(npc_id)]
            }, function(err, result) {
                if (!err) {
                    console.log('success, processing result');
                    var question = result.rows[0].value.question;
                    var options = [];
                    if (result.rows[0].value.answer === false || result.rows[0].value.answer === true) {
                        options.push({
                            'label': 'yes',
                            'value': true
                        });
                        options.push({
                            'label': 'no',
                            'value': false
                        });
                    }
                    //console.log(JSON.stringify(result, null, 4));
                    response.send({
                        'question': question,
                        'options': options
                    });
                } else {
                    console.log(err);
                    response.send(err);
                }
            });
        } catch (exc) {
            console.log(exc);
        }
    }
});

router.get('/readNpcTryGuess', function(request, response) {
    'use strict';
    console.log('readNpcQuestion for NPC ' + request.query.npc_id + ' guess: ' + request.query.guess);
    if (request.query.npc_id !== undefined) {
        var npc_id = request.query.npc_id;
        var guess = request.query.guess;
        var nanoDb = nano.db.use(dbName);
        var params = {
            keys: [npc_id + '']
        };
        console.log(params.keys);
        try {
            nanoDb.view(collectionName, 'docNpcAllByMapId', {
                keys: [parseInt(npc_id)]
            }, function(err, result) {
                if (!err) {
                    console.log('success, processing result: ');
                    console.log(JSON.stringify(result, null, 4));
                    var question = result.rows[0].value.question;
                    var answer = result.rows[0].value.answer;
                    var isCorrectAnswer = (answer + '' == guess + '');
                    var npcValue = result.rows[0].value.value;
                    console.log(answer + ' == ' + guess + ' ' + isCorrectAnswer);
                    response.send({
                        'question': question,
                        'guess': guess,
                        'result': isCorrectAnswer,
                        'value': npcValue
                    });
                } else {
                    console.log(err);
                    response.send(err);
                }
            });
        } catch (exc) {
            console.log(exc);
        }
    }
});

router.get('/read', function(request, response) {
    'use strict';
    console.log('Read called: ' + JSON.stringify(request.query));

    var nanoDb = nano.db.use(dbName);
    nanoDb.get(request.query.docName, {
        revs_info: true
    }, function(err, body) {
        if (!err) {
            console.log(body);
            response.send(body);
        } else {
            var cscMessage = 'No such record as: ' + request.query.docName +
                '. Use a the Get Doc Names button to find ' +
                'the name of an existing document.';
            err.p282special = cscMessage;
            response.status(500)
                .send(err);
        }

    });
});
module.exports = router;
