function routerLevelDbFunctions(nano, gameserver, fishUtilities) {
    'use strict';
    var express = require('express');
    var router = express.Router();

    var nanodb = nano.use(gameserver);

    var designDocs = require('./couchLevelDesignDocs');
    console.log(fishUtilities);
    var couchLevelCreateDb = require('./couchLevelCreateDb')(fishUtilities);

    var mypath = '/db';

    router.get('/home', function(request, response) {
        nanodb
            .info(function(err, body) {
                var dbHealth;
                if (err && err.statusCode === 404) {
                    dbHealth = 'There\'s no game database';
                } else if (err) {
                    dbHealth = err;
                } else {
                    dbHealth = body;
                }
                response.render('editor/level/levelDbControl.pug', {
                    'status': JSON.stringify(dbHealth, null, 4)
                });
            });
    });

    router.get('/rebuildDb', function(request, response) {

        // couchLevelCreateDb.createLevelDatabase(nano, gameserver, function(errDbCreate, bodyDbCreate) {
        console.log('rebuildDb called');
        couchLevelCreateDb.fillLevelData(nanodb, function(errFillLevel, bodyFillLevel) {
            console.log('couchLevelCreateDb returned, errstatus:' + errFillLevel);
            designDocs.buildLevelDesignDocs(nanodb, function(errDesignDocs, bodyDesignDocs) {
                console.log('couchLevelCreateDb returned, errstatus:' + errFillLevel);
                if (errDesignDocs || errFillLevel) {
                    response.status(500)
                        .send(
                            'Rebuild results: ' +
                            errFillLevel + errDesignDocs
                        );
                } else {
                    response.redirect('/editor/level/db/home');
                }
            });
        });
        // });
    });

    router.get('/deleteDb', function(request, response) {
        // nano.db.destroy(gameserver, function(err, body) {
        //     if (err) {
        //         console.log('error from couch');
        //         console.log(err);
        //         response.status(err.statusCode)
        //             .send(err);
        //     } else {
        //         response.redirect('/editor/level/db/home');
        //     }
        // });
    });

    return router;
}
module.exports = routerLevelDbFunctions;
