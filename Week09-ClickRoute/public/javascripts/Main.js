/**
 * @author Charlie Calvert
 */

require.config({
    paths: {
        'jquery': 'jquery-1.11.1.min',
    }
});

require(['jquery', 'ClickEvents'], function(jquery, ClickEvents) {
    'use strict';

    console.log('Main called');
    $(document)
        .ready(function() {
            var clickEvents = new ClickEvents();
        });
});
