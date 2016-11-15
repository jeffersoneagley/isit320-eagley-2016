/**
 * Control.js
 */

var Control = (function () {
    'use strict';

    function Control() {
        console.log('Control constructor called');
        $('#myPageButtons')
            .children('button')
            .click(showPage);
    }

    var showPage = function () {
        var myRoute = $(this).attr('jeffersonRoute');
        $.getJSON(myRoute, function (response, result) {
            $('#responseArea')
                .html(JSON.stringify(response, null, 4));
            $('#debug')
                .html(JSON.stringify(result));
            getViews(myRoute);
            if (result === "success") {
                $('#debug').attr('class', 'alert alert-success');
            } else {
                $('#debug').attr('class', 'alert alert-warning');
            }
        })
            .fail(function (jq, status, error) {
                $('#debug').attr('class', 'alert alert-warning');
                $('#debug').html('error: ' + jq.responseText);
                console.log('error: ', status);
                console.log('error: ', error);
            });
    };

    var getViews = function (myRoute) {
        $.getJSON('/views' + myRoute, function (response) {
            console.log('/views/' + myRoute);
            console.log(response.result);
            $('#viewcount').html(response.result);
        });
    };

    return Control;

}());

$(document)
    .ready(function () {
        'use strict';
        var control = new Control();
    });
