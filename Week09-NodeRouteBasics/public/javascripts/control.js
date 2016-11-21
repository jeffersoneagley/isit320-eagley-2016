function Control() {
    'use strict';

    $(document)
        .ready(function() {
            init();

        });

    function init() {
        $('#btnFeetOneMile')
            .click(clickHandlerOneMile);
        $('#btnFeetFromMiles')
            .click(clickHandlerFeetFromMiles);
        $('#btnCircumferenceFromRadius')
            .click(clickHandlerCircumferenceFromRadius);
    }

    function clickHandlerOneMile() {
        $.getJSON('/getFeetInOneMile', function(response, result) {
            console.log(response);
            if (result !== 'success') {
                $('#debug')
                    .html(JSON.stringify(response, null, 4));
            } else {
                $('#calculationOutput')
                    .val(1 + ' mile = ' + response.value.feet + ' feet');
                $('#calculationInput')
                    .val(1);
                $('#debug')
                    .html('Caculation complete!');
            }
        });
    }

    function clickHandlerFeetFromMiles() {
        var queryParams = {
            'miles': $('#calculationInput')
                .val()
        };
        console.log(queryParams);
        $.getJSON('/getFeetFromMiles', queryParams, function(response, result) {
            console.log(response);
            if (result !== 'success') {
                $('#debug')
                    .html(JSON.stringify(response, null, 4));
            } else {
                $('#calculationOutput')
                    .val(response.value.miles + ' mile = ' + response.value.feet + ' feet');
                $('#debug')
                    .html('Caculation complete!');
            }
        });
    }

    function clickHandlerCircumferenceFromRadius() {

        var queryParams = {
            'radius': $('#calculationInput')
                .val()
        };
        console.log(queryParams);
        $.post('/getCircumferenceFromRadius', queryParams, function(response, result) {
            console.log(response);
            console.log(result);
            if (result !== 'success') {
                $('#debug')
                    .html(JSON.stringify(response, null, 4));
            } else {
                $('#calculationOutput')
                    .val(response.value.radius + ' has a circumference of ' + response.value.circumference);
                $('#debug')
                    .html('Caculation complete!');
            }
        });
    }
}
Control();
