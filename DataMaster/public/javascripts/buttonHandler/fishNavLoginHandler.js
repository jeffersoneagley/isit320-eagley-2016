define([], function() {
    'use strict';
    return function(fishShowPageFragment) {
        $.get('/authentication/userbar', function(err, response) {
            if (err === 'success') {
                $('#navbarSignInOutMenu')
                    .html(response);
            } else {
                $('#navbarSignInOutMenu')
                    .html(err);
            }
        });
    };

});
