function designDocs() {
    'use strict';
    var docLevelAllHeadersByLevelID = function(doc) {
        if (doc.collection === 'levels') {
            emit(doc.levelID, {
                '_id': doc._id,
                '_rev': doc._rev,
                'levelId': doc.levelId,
                'name': doc.name,
                'description': doc.description,
                'nextLevelId': doc.nextLevelId
            });
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
                    'docLevelAllHeadersByLevelID': {
                        'map': docLevelAllHeadersByLevelID
                    }
                }
            };
            console.log('calling createDesignDocument');
            createDesignDocument(nanodb, designDocument, designName, callback);
        }
    };
}

module.exports = designDocs();
