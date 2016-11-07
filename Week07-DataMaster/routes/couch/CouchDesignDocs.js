/**
 * New node file
 */

function designDocs(router, nano, dbName) {
    'use strict';

    var firstAndLast = function(doc) {
        if (doc.firstName && doc.lastName) {
            var name = doc.firstName + ' ' + doc.lastName;
            emit(doc._id, name);
        }
    };

    var lastOnly = function(doc) {

        if (doc.firstName && doc.lastName) {
            var name = doc.lastName;
            emit(doc._id, name);
        }
    };

    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    var docNpcAllByID = function(doc) {
        emit(doc.npc_id, {
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

    /*
    var viewStatesDoc = function(doc) {
        if (doc._id === "statesDoc") {
            var data = [];
            doc.docs.forEach(function(state) {
                emit({
                    "name" : state.name,
                    "capital" : state.capital
                }, 1);
            });
            emit(doc.docs[0].abbreviation, data);
        }
    }

    var docStatesHtml = function(doc) {
        start({
            'headers' : {
                'Content-Type' : 'text/html'
            }
        });
        send('<html><body><table>');
        send('<tr><th>ID</th><th>Key</th><th>Value</th></tr>')
        while (row = viewStatesDoc()) {
            send(''.concat('<tr>', '<td>' + toJSON(row.name) + '</td>', '<td>'
                    + toJSON(row.capital) + '</td>', '<td>' + toJSON(row.value)
                    + '</td>', '</tr>'));
        }
        send('</table></body></html>');

    }*/

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
                /*  'docBulk': {
                      'map': docBulk
                  },
                'docIdDoc': {
                    'map': docIdDoc
                },
                'docNpcName': {
                    'map': docNpcName
                },
                'docNpcQuestion': {
                    'map': docNpcQuestion
                }*/
                /*,
                                "viewStatesDoc" : {
                                    "map" : viewStatesDoc
                                },
                                "docStatesHtml" : {
                                    "map" : docStatesHtml
                                }*/
            },
            'updates': {
                'update_specific_one': 'function(doc, req) { ' +
                    ' var message = \'in-place-query begun - \'; ' +
                    ' var myRequest = JSON.parse(req.body); ' +
                    ' for( field in myRequest ){ ' +
                    //  ' doc[field] = myRequest[field]; ' +
                    ' message += field + \' changed from \' + toJSON(doc) +\' to \'+myRequest[field]; ' +
                    ' } ' +
                    ' return [toJSON(doc), message]; ' +
                    '   } '
            }
        };
        console.log('calling createDesignDocument');
        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
