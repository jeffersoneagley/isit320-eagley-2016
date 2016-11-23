$(document)
    .ready(function() {
        'use strict';
        $('#target')
            .submit(function(event) {
                event.preventDefault();
                var userFormData = $(this)
                    .serialize();
                $('#formResults')
                    .html(userFormData);
            });
    });
