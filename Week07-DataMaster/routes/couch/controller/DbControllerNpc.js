function DbControllerNpc() {
    'use strict';
    return buildNpcObject();
}

function buildNpcObject() {
    'use strict';
    var npc = {};

    npc.ReadSingleNpcByID = function functionName(npc_id, nano, dbName, callback) {
        var nanoDb = nano.db.use(dbName);
        try {
            nanoDb.view('npcObjects', 'docSortedById', {
                keys: [parseInt(npc_id)]
            }, function(err, result) {
                //console.log(result);
                if (!err) {
                    console.log('success, processing result');
                    var npc = result.rows[0].value;
                    console.log(npc);
                    callback(npc);
                } else {
                    console.log(err);
                    callback(err);
                }
            });
        } catch (exc) {
            console.log(exc);
        }
    };

    npc.ReadNpcAllByID = function(nano, dbName, callback) {
        var nanoDb = nano.db.use(dbName);
        try {
            nanoDb.view('npcObjects', 'docSortedById', function(err, result) {
                console.log('response from db ' + err);
                console.log(result);
                callback(result, err);
            });
        } catch (exc) {
            console.log(exc);
        }
    };

    npc.ReadNpcAllByInitialSetupParameters = function(request, response, nano, dbName) {
        var nanoDb = nano.db.use(dbName);
        try {
            nanoDb.view('npcObjects', 'docNpcInitialSetupParameters', function(err, result) {
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
    };

    npc.ReadNpcQuestion = function(request, response, nano, dbName) {
        console.log('readNpcQuestion for NPC ' + request.query.npc_id);
        // var url = 'http://localhost:5984/prog28202/_all_docs';
        if (request.query.npc_id !== undefined) {
            var npc_id = request.query.npc_id;
            var nanoDb = nano.db.use(dbName);
            try {
                nanoDb.view('npcObjects', 'docSortedById', {
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
    };

    npc.ReadNpcTryGuess = function(request, response, nano, dbName) {
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
                nanoDb.view('npcObjects', 'docSortedById', {
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
    };

    npc.UpdateNpcEntry = function(npc_id, changes, nano, dbName, callback) {
        var nanoDb = nano.db.use(dbName);
        console.log('UpdateNpcEntry ' + npc_id + ' ' + JSON.stringify(changes));
        /*nanoDb.atomic('npcObjects', 'update_specific_one', 'docSortedById?key =' + npc_id, changes, function(err, response) {
            console.log(err);
            console.log(response);
            callback(err, response);
        });*/
        nanoDb.view('npcObjects', 'docSortedById', {
            keys: [parseInt(npc_id)]
        }, function(err, doc) {
            console.log('nano view docSortedById in UpdateNpcEntry');
            console.log(JSON.stringify(doc.rows[0]));
            var myInsertDoc = doc.rows[0].value;
            myInsertDoc._id = doc.rows[0].id;
            for (var item in changes) {
                myInsertDoc[item] = changes[item];
                console.log(item + ' changed to' + changes[item]);
            }
            console.log(JSON.stringify(myInsertDoc));
            nanoDb.insert(myInsertDoc, function(err, body) {
                console.log('insert completed ' + err + ' ' + JSON.stringify(body));
                callback(err, body);
            });
        });
    };
    return npc;
}

module.exports = DbControllerNpc;
ts = DbControllerNpc;
