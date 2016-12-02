/**
 * New node file
 */

function designDocs(router, nano, dbName) {
    'use strict';

    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    var docMapAllByID = function(map) {
        emit(map._id, {
            '_id': map._id,
            '_rev': map._rev,
            'name': map.name,
        });
    };

    var docNpcAllByID = function(doc) {
        emit(doc.npc_id, {
            '_id': doc._id,
            '_rev': doc._rev,
            'npc_id': doc.npc_id,
            'npc_name': doc.npc_name,
            'description': doc.description,
            'color': doc.color,
            'value': doc.value,
            'question': doc.question,
            'answer': doc.answer
        });
    };

    var docNpcAllByName = function(doc) {
        emit(doc.npc_name, {
            '_id': doc._id,
            '_rev': doc._rev,
            'npc_id': doc.npc_id,
            'npc_name': doc.npc_name,
            'description': doc.description,
            'color': doc.color,
            'value': doc.value,
            'question': doc.question,
            'answer': doc.answer
        });
    };

    var docNpcInitialSetupParameters = function(doc) {
        emit(doc.npc_id, {
            'npc_id': doc.npc_id,
            'color': doc.color,
        });
    };

    var docNpcAnswerBool = function(npc) {
        if (typeof (npc.answer) === 'boolean') {
            emit(npc.npc_name + ': ' + npc.answer, {
                'npc_id': npc.npc_id,
                'npc_name': npc.npc_name,
                'description': npc.description,
                'color': npc.color,
                'value': npc.value,
                'question': npc.question,
                'answer': npc.answer
            });
        }
    };

    var docGetSpecificNpcById = function(doc) {
        if (doc.npc_id === 'npcDoc') {
            var data = [];
            doc.docs.forEach(function(npc) {
                data.push({
                    '_id': npc.id,
                    'npc_id': npc.npc_id,
                    'npc_name': npc.npc_name,
                    'description': npc.description,
                    'color': npc.color,
                    'value': npc.value,
                    'question': npc.question,
                    'answer': npc.answer
                });
            });
            emit(doc.npc_id, data);
        }
    };

    function createDesignDocument(designDocument, designName, response) {
        console.log('createDesignDocument');
        console.log('createDesignDocument(' + designDocument + ', ' +
            designName + ', ' +
            response + ')');
        var nanoDb = nano.db.use(dbName);
        nanoDb.insert(designDocument, designName, function(error, body) {
            if (!error) {
                console.log(body);
                response.send(body);
            } else {
                console.log('error: ' + error);
                response.send({
                    'Result': 'The document might already exist. ' + error
                });
            }
        });
    }

    router.get('/designDoc', function(request, response) {

        console.log('/designDoc Called');

        var designName = '_design/npcObjects';
        var designDocument = {
            'views': {
                'docSortedById': {
                    'map': docNpcAllByID
                },
                'docSortedByName': {
                    'map': docNpcAllByName
                },
                'docAnswersBoolOnly': {
                    'map': docNpcAnswerBool
                },
                'docNpcInitialSetupParameters': {
                    'map': docNpcInitialSetupParameters
                },
                'docGetSpecificNpcById': {
                    'map': docGetSpecificNpcById
                }
            }
        };
        console.log('calling createDesignDocument');
        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
