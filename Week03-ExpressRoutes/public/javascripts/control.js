$(document)
    .ready(function() {
        'use strict';
        $('#add')
            .click(addPair);

        function addPair() {
            var operatorA = $('#operatorA')
                .val();
            var operatorB = $('#operatorB')
                .val();
            console.log('operators:', operatorA, operatorB);
            var requestQuery = {
                operatorA: operatorA,
                operatorB: operatorB
            };
            $.getJSON('/add', requestQuery, function(result) {
                console.log(result);
                $('#display')
                    .html(JSON.stringify(result.result));
            });
        }
    });
