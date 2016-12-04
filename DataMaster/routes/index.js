var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./SignedIn');

// var routeParamMiddleware = function(request, response, next) {
//     'use strict';
//     console.log('My middleware called by this route:', request.originalUrl);
//     next();
// };

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Data Master'
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

router.get('/authentication/logout', function(request, response) {
    'use strict';
    request.logout();
    response.redirect('/');
});

router.get('/authentication/login', function(request, response) {
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

router.get('/authentication/userbar', function(request, response) {
    'use strict';
    console.log('getting navbar signin options');
    console.log('is user logged in? ' + request.isAuthenticated());
    if (request.isAuthenticated()) {
        console.log('user: ' + request.user.displayName + ' ID: ' + request.user.id);
    }
    var params = {
        isAuthenticated: request.isAuthenticated(),
        user: request.user
    };
    response.render('authentication/usernavbar', params);
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
