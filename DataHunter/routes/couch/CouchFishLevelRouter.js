function fishLevelRouter(nano, dbName) {
    'use strict';
    var express = require('express');
    var router = express.Router();
    var designName = 'levelObjects';

    router.get('/load/:id', function(request, response) {
        console.log('readNpcInitialSetupParameters called');
        // var url = 'http://localhost:5984/prog28202/_all_docs';

        var nanoDb = nano.db.use(dbName);
        try {
            var requestedMapId = parseInt(request.params.id);
            nanoDb.view(designName, 'docLevelAllLevelsByLevelId', {
                    keys: [requestedMapId]
                },
                function(err, result) {
                    console.log('response from db err:' + err);
                    console.log(result);
                    response.send(result.rows[0].value);
                });
        } catch (exc) {
            console.log(exc);
        }
    });

    router.use('/', function() {
        console.log('fishLevelRouter hit');
    });
    return router;
}
module.exports = fishLevelRouter;
