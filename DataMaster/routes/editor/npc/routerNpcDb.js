function routerNpcDbFunctions(nano, router, gameserver) {
    'use strict';

    var designDocs = require('./couchNpcDesignDocs');
    var couchNpcCreateDb = require('./couchNpcCreateDb');

    var mypath = '/db';

    router.get(mypath + '/home', function(request, response) {
        nano.db.use(gameserver)
            .info(function(err, body) {
                var dbHealth;
                if (err && err.statusCode === 404) {
                    dbHealth = 'There\'s no game database';
                } else if (err) {
                    dbHealth = err;
                } else {
                    dbHealth = body;
                }
                response.render('editor/npc/npcDbControl.pug', {
                    'status': JSON.stringify(dbHealth, null, 4)
                });
            });
    });

    router.get(mypath + '/rebuildDb', function(request, response) {

        couchNpcCreateDb.createNpcDatabase(nano, gameserver, function(errDbCreate, bodyDbCreate) {

            couchNpcCreateDb.fillNpcData(nano, gameserver, function(errFillNpc, bodyFillNpc) {

                designDocs.buildNpcDesignDocs(nano, gameserver, function(errDesignDocs, bodyDesignDocs) {
                    if (errDbCreate || errDesignDocs || errFillNpc) {
                        response.status(500)
                            .send(
                                'Rebuild results: ' +
                                errDbCreate + errFillNpc + errDesignDocs
                            );
                    } else {
                        response.redirect('/editor/npc/db/home');
                    }
                });
            });
        });
    });

    router.get(mypath + '/deleteDb', function(request, response) {
        nano.db.destroy(gameserver, function(err, body) {
            if (err) {
                console.log('error from couch');
                console.log(err);
                response.status(err.statusCode)
                    .send(err);
            } else {
                response.redirect('/editor/npc/db/home');
            }
        });
    });
}
module.exports = routerNpcDbFunctions;
