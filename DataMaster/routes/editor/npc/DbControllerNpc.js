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

    npc.UpdateNpcEntry = function(docId, docRev, changes, nano, dbName, callback) {
        try {
            var nanoDb = nano.db.use(dbName);
            nanoDb.get(docId, function(err, doc) {
                console.log('nano get doc');
                console.log(JSON.stringify(doc));
                var myInsertDoc = doc;
                myInsertDoc.id = docId;
                myInsertDoc.rev = docRev;
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
        } catch (e) {
            console.log(e);
            callback(e);
        } finally {

        }

    };
    return npc;
}

module.exports = DbControllerNpc;
