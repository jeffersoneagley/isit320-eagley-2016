// LOAD PARSEURL:
var parseurl = require('parseurl');
// WHAT OTHER PACKAGES NEED TO BE LOADED BEFORE THIS CODE WILL WORK?
var express = require('express');
var router = express.Router();
var session = require('express-session');
var uuid = require('uuid');
var FileStoreSession = require('session-file-store')(session);
var baseSessionStore = require('sessionstore');
var setServer = require('../src/SetServer/set-server-couch');

var sessionStore = baseSessionStore.createSessionStore({
    type: 'couchdb',
    host: setServer.serverUrl, // optional
    port: 5984, // optional
    dbName: 'couch-session-eagley', // optional
    collectionName: 'sessions', // optional
    timeout: 10000 // optional
});

var ConnectCouchDB = require('connect-couchdb')(session);

var couchStore = new ConnectCouchDB({
    // Name of the database you would like to use for sessions.
    name: 'couch-session-eagley',

    // Optional. Database connection details. See yacw documentation
    // for more informations
    //username: 'username',
    //password: 'password',
    host: 'localhost',

    // Optional. How often expired sessions should be cleaned up.
    // Defaults to 600000 (10 minutes).
    reapInterval: 600000,

    // Optional. How often to run DB compaction against the session
    // database. Defaults to 300000 (5 minutes).
    // To disable compaction, set compactInterval to -1
    compactInterval: 300000,

    // Optional. How many time between two identical session store
    // Defaults to 60000 (1 minute)
    setThrottle: 60000
});

router.use(session({
    genid: function(req) {
        'use strict';
        return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

router.use(function(request, response, next) {
    'use strict';
    console.log('Sample middleware with useful output');
    console.log('request cookies', request.cookies);
    console.log('request secret', request.secret);
    // Uncomment the following line for one run, perhaps.
    // It is too verbose to use everytime
    //console.log(Object.getOwnPropertyNames(request));
    //console.log(request.headers);
    next();
});

router.use(function(request, response, next) {
    'use strict';
    var views = request.session.views;

    if (!views) {
        views = request.session.views = {};
    }

    // get the url pathname
    var pathname = parseurl(request)
        .pathname;
    console.log('pathname', pathname);
    console.log('views', views);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;

    next();
});

// WHAT DO YOU NEED TO DO HERE TO EXPORT THIS CODE FROM THIS MODULE?
module.exports = router;
