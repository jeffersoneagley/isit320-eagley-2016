// LOAD PARSEURL:
var parseurl = require('parseurl');
// WHAT OTHER PACKAGES NEED TO BE LOADED BEFORE THIS CODE WILL WORK?
var express = require('express');
var router = express.Router();
var session = require('express-session');
var uuid = require('uuid');
var FileStoreSession = require('session-file-store')(session);

router.use(session({
    genid: function (req) {
        'use strict';
        return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new FileStoreSession()
}));

router.use(function (request, response, next) {
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

router.use(function (request, response, next) {
    'use strict';
    var views = request.session.views;

    if (!views) {
        views = request.session.views = {};
    }

    // get the url pathname
    var pathname = parseurl(request).pathname;
    console.log('pathname', pathname);
    console.log('views', views);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;

    next();
});

// WHAT DO YOU NEED TO DO HERE TO EXPORT THIS CODE FROM THIS MODULE?
module.exports = router;