$(document)
    .ready(function() {
        'use strict';
        console.log('Document loaded in IST320');

        $('#readLocal')
            .click(read);
        $('#readJson')
            .click('click', readJson);

        function read() {
            console.log('callRead called');
            $.getJSON('/read', function(result) {
                console.log(result);
                $('#display')
                    .html(JSON.stringify(result));
            });
        }

        function readJson() {
            console.log('readJson called');
            $.getJSON('names.json', function(result) {
                console.log(result);
                $('#display')
                    .html(JSON.stringify(result));
            });
        }
    });
