/*
 * @author: Charlie Calvert
 * @name: main.js
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': '/components/jquery/dist/jquery',
        'control': '/javascripts/control'
    }
});

requirejs(['jquery'], function($) {
    'use strict';

    requirejs(['control'], function(control) {
        $(document)
            .ready(function() {

            });
    });
});
