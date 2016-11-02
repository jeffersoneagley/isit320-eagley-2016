var express = require('express');
var router = express.Router();
var fs = require('fs');

var servers = ['http://192.168.2.19:5984', 'http://10.0.2.5:5984', 'http://127.0.0.1:5984'];
var serverIndex = 1;
var nano = require('nano')(servers[serverIndex]);

var dbName = 'game_data_eagley';

function couchMultiplayer(router, nano, dbName) {
    'use strict';
    router.get('/mp', function() {

    });
}
module.exports = couchMultiplayer;
