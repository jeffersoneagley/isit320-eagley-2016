define([require], function() {
    'use strict';
    var displayDiv;

    function Home(myDisplayDiv) {
        displayDiv = myDisplayDiv;
        console.log($('#buttonNavHome'));
        $('#buttonNavHome')
            .click(HomeClickhandler);
    }

    function HomeClickhandler() {
        console.log('HomeClickhandler');
        $.get('/home', function(response, result) {
            console.log('response from server: ' + result);
            console.log(response);
            if (result !== 'success') {
                console.log('warning, failed to load');
            } else {
                displayDiv.html(response);
            }
        });
    }

    return Home;
});
