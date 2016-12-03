var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');

var routes = require('./routes/index');
var users = require('./routes/users');
var fishMiddleware = require('./routes/fishMiddleware');
var fishViews = require('./routes/fishViews');
var couchController = require('./routes/couch/Couch');
var editorRoutes = require('./routes/editor/editorRoutes');

var google = require('./routes/login-google');
var facebook = require('./routes/login-facebook');

var session = require('express-session');
var passport = require('passport');

var app = express();

app.use(favicon('./public/favicon.png'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fishMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', google);
app.use('/facebook', facebook);
app.use('/views', fishViews);
app.use('/editor', editorRoutes);
app.use('/couch', couchController);
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    'use strict';
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        'use strict';
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    'use strict';
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
