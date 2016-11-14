/**
 * Created by charlie on 11/5/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

/**************************************
 *  Facebook
 **************************************/

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        'use strict';
        console.log(req.user);
        res.render('profile-facebook', {
            title: 'Facebook Profile',
            user: req.user
        });
    });

passport.use(new FacebookStrategy({
        clientID: '334348190278338',
        clientSecret: '4568372c4c4400f1ca1a6bc3b7454ad7',
        callbackURL: 'http://localhost:30025/facebook/login/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
        'use strict';
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        return done(null, profile);
    }));

router.get('/login',
    passport.authenticate('facebook'));

router.get('/login/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        'use strict';
        res.redirect('/');
    });

module.exports = router;
//Here is a way to use the profileFields property to alter the Facebook Strategy so you can get more information about the user:

// passport.use(new FacebookStrategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: 'http://localhost:30025/facebook/login/return',
//         profileFields: ['id', 'displayName', 'photos', 'email']
//     },
//     function (accessToken, refreshToken, profile, done) {
//         'use strict';
//         console.log('accessToken', accessToken);
//         console.log('refreshToken', refreshToken);
//         console.log('profile', profile);
//         return done(null, profile);
//     }));