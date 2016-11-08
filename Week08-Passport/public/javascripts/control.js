/**
 * Control.js
 */

var Control = (function() {
    'use strict';

    function Control() {
        console.log('Control constructor called');
        $('#info')
            .click(info);
    }

    var info = function() {
        // WRITE AN AJAX OR GET JSON METHOD THAT CALLS THE /info ROUTE AND DISPLAYS THE RESULT
        // THIS SHOULD INCLUDE THE USER INFORMATION SHOWN BELOW IN MY GOOGLE ACCOUNT SCREENSHOT
        $.getJSON('/status', function(err, response) {
            $('#displayBasicInfo')
                .html(response);
        });
    };

    return Control;

}());

$(document)
    .ready(function() {
        'use strict';
        var control = new Control();
    });
