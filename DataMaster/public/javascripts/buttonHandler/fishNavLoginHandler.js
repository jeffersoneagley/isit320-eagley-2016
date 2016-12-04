define([], function() {
    'use strict';
    return function(fishShowPageFragment, next) {
        $.get('/authentication/userbar', function(response, result) {
            $('#navbarSignInOutMenu')
                .empty()
                .html(response);
            if (result === 'success') {} else {
                $('#debug')
                    .html(result);
                console.log(result);
            }
            next(fishShowPageFragment, '#navbarSignInOutMenu');
        });
    };

});
