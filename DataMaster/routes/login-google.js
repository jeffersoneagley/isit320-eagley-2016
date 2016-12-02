/**
 * Created by charlie on 11/5/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20')
    .Strategy;

/**************************************
 *  Google
 **************************************/

function ensureAuthenticated(req, res, next) {
    'use strict';
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/account', ensureAuthenticated, function(request, response) {
    'use strict';
    response.render('profile-google', {
        title: 'Google Account',
        user: request.user
    });
});

passport.use(new GoogleStrategy({
        clientID: '516098240111-sb627eh7rj84a20vk1bh79sf2s0rliik.apps.googleusercontent.com',
        clientSecret: 'WPbs7v6k7rSB9aiH7LJVLkMY',
        callbackURL: 'http://localhost:30025/auth/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        'use strict';
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // Return Google profile for now. We will add Database data here later.
            return done(null, profile);
        });
    }
));

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

//router.get('/auth/google/callback',
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        'use strict';
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// router.get('/auth', function (req, res) {
//     res.redirect('/');
//
// })

module.exports = router;
