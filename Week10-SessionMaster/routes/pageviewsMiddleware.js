// LOAD PARSEURL:
var parseurl = require('parseurl');
// WHAT OTHER PACKAGES NEED TO BE LOADED BEFORE THIS CODE WILL WORK?
var express = require('express');
var router = express.Router();

var logPageView = function(request, response) {
    'use strict';
    var previousPage = '';
    if (request.session.lastPage) {
        previousPage = request.session.lastPage;
    }

    request.session.lastPage = request.url;
    var welcome = 'Welcome to ' + request.url;
    console.log('welcome', welcome);
};

module.exports = router;
