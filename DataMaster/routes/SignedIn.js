/**
 * SignedIn.js
 */

function signedIn(request, response, next) {
    'use strict';
    if (request.isAuthenticated()) {
        console.log('authenticated and valid');
        return next();
    } else {
        console.log('not authenticated.');
        response.redirect('/authentication/login');
    }
}

exports.signedIn = signedIn;
