/**
 * SignedIn.js
 */

function signedIn(request, response, next) {
    if (request.isAuthenticated()) {
        console.log("authenticated and valid");
        return next();
    }
    console.log("not authenticated.");
    response.redirect('/login');
}

exports.signedIn = signedIn;
