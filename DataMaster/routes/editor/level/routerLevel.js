var buildRoutes = function(nano, gameserver, fishUtilities) {
    'use strict';
    var express = require('express');
    var router = express.Router();

    var dbControllerLevel = require('./DbControllerLevel')();
    var routerLevelDb = require('./routerLevelDb')(nano, gameserver, fishUtilities);

    router.get('/home', function(request, response) {
        console.log('getting db from db');
        try {
            nano.db.use(gameserver)
                .view('levelObjects', 'docLevelAllHeadersByLevelID', function(err, result) {
                    var levelPageParams = {
                        'levelList': []
                    };
                    if (!err && result && result.rows) {
                        levelPageParams = {
                            'levelList': result.rows
                        };
                    }
                    console.log('response from db ' + err);
                    console.log(JSON.stringify(result));
                    response.render('editor/level/home.pug', levelPageParams);
                });
        } catch (exc) {
            console.log(exc);
        }
    });

    router.get('/update', function(request, response) {
        try {
            console.log(request.query);
            if (request.query.changes !== undefined &&
                request.query.id !== undefined && request.query.rev !== undefined) {
                var changes = request.query.changes;
                console.log('pushing update');
                dbControllerLevel.UpdateLevelEntry(
                        request.query.id,
                        request.query.rev,
                        changes, nano, gameserver,
                        function(err, result) {
                            console.log('attempted insert, err: ' + err);
                            response.render('editor/level/levelUpdatedSingle.pug', {
                                'result': result,
                                'changes': changes
                            });
                        })
                    .fail(function(err, result) {
                        response.send({
                            'result': result,
                            'err': err
                        });
                    });
            } else {
                console.log('fail');
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    });

    router.get('/edit/:id', function(request, response) {
        try {
            console.log('called edit for docid ' + request.params.id);
            nano.db.use(gameserver)
                .get(request.params.id, function(err, result) {
                    console.log('Error from couch:');
                    console.log(err);
                    response.render('editor/level/levelEditSingle.pug', {
                        'level': result
                    });
                });
        } catch (e) {
            console.log(e);
        } finally {

        }
    });
    router.use('/db', routerLevelDb);
    return router;
};
module.exports = buildRoutes;
