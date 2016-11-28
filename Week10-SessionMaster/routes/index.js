var express = require('express');
var router = express.Router();
var passport = require('passport');

// var routeParamMiddleware = function(request, response, next) {
//     'use strict';
//     console.log('My middleware called by this route:', request.originalUrl);
//     next();
// };

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Week09 Session Basics'
    });
});

// router.use(function(request, response, next) {
//     'use strict';
//     logPageView(request, response);
// });

passport.serializeUser(function(user, done) {
    'use strict';
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    'use strict';
    done(null, obj);
});

router.get('/logout', function(request, response) {
    'use strict';
    request.logout();
    response.redirect('/');
});

router.get('/login', function(request, response) {
    'use strict';
    try {
        response.render('login-options');

    } catch (e) {
        console.log(e);
    }
});

var logAndGetReport = function(req, res) {
    'use strict';
    logPageView(req, res);
    pageReport(req, res);
};

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

var pageReport = function(request, response) {
    'use strict';
    var previousPage = '';
    if (request.session.lastPage) {
        previousPage = request.session.lastPage;
    }

    request.session.lastPage = request.url;
    var welcome = 'Welcome to ' + request.url;
    console.log('welcome', welcome);
    response.send({
        currentPage: request.url,
        previousPage: previousPage,
        'session': request.session
    });
};
router.get('/page01', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page02', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page03', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/status', function(request, response) {
    'use strict';
    console.log('Status called');
    console.log('Auth: ' + request.isAuthenticated('google'));
    response.send({
        result: 'Success',
        authenticated: request.isAuthenticated()
    });
});

module.exports = router;
