/**
 * SignedIn.js
 */

function signedIn(request, response, next) {
    'use strict';
    try {
        if (request.isAuthenticated()) {
            console.log('authenticated and valid');
            return next();
        } else {
            console.log('not authenticated.');
            response.redirect('/authentication/login');
        }
    } catch (e) {
        console.log(e);
    }
}

exports.signedIn = signedIn;
