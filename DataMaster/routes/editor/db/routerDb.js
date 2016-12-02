var express = require('express');
var router = express.Router();
var setServer = require('../../src/SetServer/set-server-couch');
var nano = require('nano')(setServer.serverUrl);
//var isAuthenticated = require('../SignedIn');

module.exports = (function() {
    'use strict';
    router.get('/', function(request, response) {

        response.render('editor/db/home.pug', {});
    });
});
