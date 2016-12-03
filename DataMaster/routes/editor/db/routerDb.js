var express = require('express');
var router = express.Router();
var setServer = require('../../../src/SetServer/set-server-couch');
var nano = require('nano')(setServer.serverUrl);
//var isAuthenticated = require('../SignedIn');

var buildRoutes = function() {
    'use strict';
    router.get('/home', function(request, response) {
        console.log('getting db from db');
        nano.db.list(function(err, body) {
            console.log(body);
            response.render('editor/db/home.pug', {
                'databases': body
            });
        });
    });
    module.exports = router;
};
buildRoutes();
