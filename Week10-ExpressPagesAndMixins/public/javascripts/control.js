define(['about', 'home'], function(About, Home) {
    'use strict';
    var displayDiv = '';

    function Control() {
        displayDiv = $('#myContainer');
        var aboutInit = new About(displayDiv);
        var homeInit = new Home(displayDiv);
    }

    return Control;
});
