/**
 * Builds database designDocs for cartography functions
 */

function designDocs(router, nano, dbName) {
    'use strict';

    var designDocMapFunctions = require('./designDocs/CartogrphyDesignDocMapFunctions');
    var createDesignDocument = require('../CouchCreateDesignDocument');

    router.get('/designDoc', function(request, response) {

        console.log('/designDoc Called');

        var designName = '_design/cartography';
        var designDocument = {
            'views': designDocMapFunctions
        };
        console.log('calling createDesignDocument');
        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
