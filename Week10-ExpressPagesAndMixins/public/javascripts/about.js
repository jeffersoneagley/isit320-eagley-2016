var About = (function() {
    'use strict';
    var displayDiv;

    function About(myDisplayDiv) {
        displayDiv = myDisplayDiv;
        $('buttonAbout')
            .click(AboutClickhandler);
    }

    function AboutClickhandler() {
        $.getJSON('/about', function(response, result) {
            if (result !== 'success') {
                console.log('warning, failed to load');
            } else {
                displayDiv.html(response);
            }
        });
    }

    return About;
})();
