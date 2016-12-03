define([],
    function() {
        'use strict';

        function Control() {
            console.log('Control constructor called');
            var myOutput = $('#responseArea');
            console.log(myOutput);
            $('button[fishroute]')
                .click(showPage);
        }

        var showPage = function() {
            var myRoute = $(this)
                .attr('fishroute');
            $.get(myRoute, function(response, result) {
                    $('#responseArea')
                        .html(response);
                    $('#debug')
                        .html(JSON.stringify(result));
                    $('button[fishroute]')
                        .click(showPage);
                    getViews(myRoute);
                    if (result === 'success') {
                        $('#debug')
                            .attr('class', 'alert alert-success');
                    } else {
                        $('#debug')
                            .attr('class', 'alert alert-warning');
                    }
                })
                .fail(function(jq, status, error) {
                    $('#debug')
                        .attr('class', 'alert alert-warning');
                    $('#debug')
                        .html('error: ' + jq.responseText);
                    console.log('error: ', status);
                    console.log('error: ', error);
                });
        };

        var getViews = function(myRoute) {
            $.getJSON('/views' + myRoute, function(response) {
                console.log('/views/' + myRoute);
                console.log(response.result);
                $('#viewcount')
                    .html(response.result);
            });
        };

        var loginInfo = function() {
            // WRITE AN AJAX OR GET JSON METHOD THAT CALLS THE /info ROUTE AND DISPLAYS THE RESULT
            // THIS SHOULD INCLUDE THE USER INFORMATION SHOWN BELOW IN MY GOOGLE ACCOUNT SCREENSHOT
            $.getJSON('/status', function(err, response) {
                $('#report')
                    .html(JSON.stringify(response));
                $('#debug')
                    .html(JSON.stringify(err));
            });
        };

        var loginRefresh = function() {
            $.getJSON('/status', function(err, response) {

            });
        };

        return Control;

    });
