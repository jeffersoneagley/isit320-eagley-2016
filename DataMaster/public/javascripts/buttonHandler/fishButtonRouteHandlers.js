define([], function() {
    'use strict';
    return function(fishShowPageFragment) {
        $('button[fishroute]')
            .unbind('click')
            .click(fishShowPageFragment.ClickHandler);

    };

});
