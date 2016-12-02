function DbControllerMap() {
    'use strict';
    return buildMapObject();
}

function buildMapObject() {
    'use strict';
    var map = {};

    map.ReadSingleMapByID = function functionName(map_id, nano, dbName, callback) {
        var nanoDb = nano.db.use(dbName);
        try {
            nanoDb.view('cartography', 'docAllMap', {
                keys: [parseInt(map_id)]
            }, function(err, result) {
                //console.log(result);
                if (!err) {
                    console.log('success, processing result');
                    var map = result.rows[0].value;
                    console.log(map);
                    callback(map);
                } else {
                    console.log(err);
                    callback(err);
                }
            });
        } catch (exc) {
            console.log(exc);
        }
    };

    map.ReadMapAllHeaders = function(nano, dbName, callback) {
        var nanoDb = nano.db.use(dbName);
        try {
            nanoDb.view('mapObjects', 'docSortedById', function(err, result) {
                console.log('response from db ' + err);
                console.log(result);
                callback(result, err);
            });
        } catch (exc) {
            console.log(exc);
        }
    };

    map.UpdateMapEntry = function(docId, changes, nano, dbName, callback) {
        var nanoDb = nano.db.use(dbName);
        nanoDb.get(docId, function(err, doc) {
            console.log('nano get doc');
            console.log(JSON.stringify(doc));
            var myInsertDoc = doc;
            myInsertDoc._id = docId;
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
    return map;
}

module.exports = DbControllerMap;
