define([require], function() {
    'use strict';
    var displayDiv;

    function About(myDisplayDiv) {
        displayDiv = myDisplayDiv;
        console.log($('#buttonNavAbout'));
        $('#buttonNavAbout')
            .click(AboutClickhandler);
    }

    function AboutClickhandler() {
        console.log('AboutClickhandler');
        $.get('/about', function(response, result) {
            console.log('response from server: ' + result);
            console.log(response);
            if (result !== 'success') {
                console.log('warning, failed to load');
            } else {
                displayDiv.html(response);
            }
        });
    }

    return About;
});
