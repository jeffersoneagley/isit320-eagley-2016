function designDocs() {
    'use strict';
    var elfSessions = function(doc) {
        if (doc.collectionName === 'sessions') {
            emit(doc._id, doc);
        }
    };

    var elfSessionStore = function(doc) {
        if (doc.collectionName === 'sessions') {
            emit(doc._id, doc);
        }
    };

    var elfSessionExpires = function(doc) {
        if (doc.collectionName === 'sessions' && doc.expires) {
            emit(doc._id, doc.expires);
        }
    };
    var docNpcAllByMapID = function(doc) {
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
    var docNpcAllByDocID = function(doc) {
        emit(doc._id, {
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
        if (typeof(npc.answer) === 'boolean') {
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

    function createDesignDocument(nano, dbName, designDocument, designName, callback) {
        console.log('createDesignDocument ' + designName + ' ' + designDocument);
        var nanoDb = nano.db.use(dbName);
        nanoDb.insert(designDocument, designName, function(error, body) {
            console.log('designDocument err ' + error + ' body ' + body);
            callback(error, body);
        });
    }

    return {
        buildNpcDesignDocs: function(nano, dbName, callback) {

            console.log('Building npc design docs');

            var designName = '_design/npcObjects';
            var designDocument = {
                'views': {
                    'docGetSpecificNpcById': {
                        'map': docGetSpecificNpcById
                    },
                    'docNpcAnswerBool': {
                        'map': docNpcAnswerBool
                    },
                    'docNpcInitialSetupParameters': {
                        'map': docNpcInitialSetupParameters
                    },
                    'docNpcAllByName': {
                        'map': docNpcAllByName
                    },
                    'docNpcAllByDocID': {
                        'map': docNpcAllByDocID
                    },
                    'docNpcAllByMapID': {
                        'map': docNpcAllByMapID
                    }
                }
            };
            createDesignDocument(nano, dbName, designDocument, designName, callback);
        },

        buildSessionDesignDocs: function(nano, dbName, callback) {

            console.log('Building session design docs');

            var designName = '_design/elf-sessions';
            var designDocument = {
                'views': {
                    'docElfSessions': {
                        'map': elfSessions
                    }
                }
            };
            console.log('calling createDesignDocument');
            createDesignDocument(nano, dbName, designDocument, designName, callback);
        }
    };
}

module.exports = designDocs();
