function designDocs() {
    'use strict';
    var docLevelAllHeadersByLevelId = function(doc) {
        if (doc.collection === 'levels') {
            emit(doc.levelId, {
                '_id': doc._id,
                '_rev': doc._rev,
                'levelId': doc.levelId,
                'name': doc.name,
                'description': doc.description,
                'nextLevelId': doc.nextLevelId
            });
        }
    };
    var docLevelAllLevelsByLevelId = function(doc) {
        if (doc.collection === 'levels') {
            emit(doc.levelId, doc);
        }
    };

    function createDesignDocument(nanodb, designDocument, designName, callback) {
        console.log('createDesignDocument ' + designName + ' ' + designDocument);
        nanodb.insert(designDocument, designName, function(error, body) {
            console.log('designDocument err: ' + error);
            callback(error, body);
        });
    }

    return {

        buildLevelDesignDocs: function(nanodb, callback) {

            console.log('Building session design docs');

            var designName = '_design/levelObjects';
            var designDocument = {
                'views': {
                    'docLevelAllHeadersByLevelId': {
                        'map': docLevelAllHeadersByLevelId
                    },
                    'docLevelAllLevelsByLevelId': {
                        'map': docLevelAllLevelsByLevelId
                    }
                }
            };
            console.log('calling createDesignDocument');
            createDesignDocument(nanodb, designDocument, designName, callback);
        }
    };
}

module.exports = designDocs();
