$(document)
    .ready(function () {
        'use strict';
        $.getJSON('/getIndex', function (result) {
            $('#output')
                .html(result);

        })
    });
