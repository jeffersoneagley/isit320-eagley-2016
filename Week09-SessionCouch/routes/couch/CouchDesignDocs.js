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

    var elfSessions = function(doc) {
        if (doc.collectionName === 'sessions') {
            emit(doc._id, doc);
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

        var designName = '_design/elf-sessions';
        var designDocument = {
            'views': {
                'docElfSessions': {
                    'map': elfSessions
                }
            }
        };
        console.log('calling createDesignDocument');
        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
