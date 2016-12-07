function editorRoutes() {
    'use strict';
    var gameserver = 'game_data_eagley';
    var express = require('express');
    var router = express.Router();

    //loading my utilitybelt
    var fishUtilities = require('./util/fishUtilities')();

    var isAuthenticated = require('./../SignedIn');
    var setServer = require('../../src/SetServer/set-server-couch');

    var nano = require('nano')(setServer.serverUrl);

    var routerNpc = require('./npc/routerNpc')(nano, gameserver, fishUtilities);
    var routerLevel = require('./level/routerLevel')(nano, gameserver, fishUtilities);
    var routerDb = require('./db/routerDb');

    router.use('/', function(request, response, next) {
        isAuthenticated.signedIn(request, response, next);
    });

    function useRoute(routeString, routeManager) {
        try {
            router.use(routeString, routeManager);
        } catch (e) {
            console.log(e);
        }
    }

    useRoute('/npc', routerNpc);
    useRoute('/level', routerLevel);
    useRoute('/db', routerDb);

    module.exports = router;

}
editorRoutes();
