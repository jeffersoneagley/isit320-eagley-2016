define([require],
    function() {
        'use strict';
        var myButtonPanel = $('#buttonPanelControls');

        function Control() {
            console.log('control launched');
            FillRoutes();
        }

        function FillRoutes() {
            console.log('FillRoutes');
            $.getJSON('/getCouchRoutes', function(response) {
                console.log('FillRoutes response: ' + response);
                for (var i = 0; i < response.rows.length; i++) {
                    FillOneRoute(response.rows[i]);
                }
            });
        }

        function FillOneRoute(myRouteEntry) {
            var myButton = $('<button>');
            myButton.html(myRouteEntry.buttonLabel);
            myButton.attr('class', 'btn btn-primary btn-lg btn-block');
            var myRoute = myRouteEntry.route;
            myButton.click(function() {
                LoadRoute(myRoute);
            });
            myButtonPanel.append(myButton);
        }

        function LoadRoute(routeName) {
            $.getJSON(routeName, function(response, result) {
                console.log(response);
                $('#responseTitle')
                    .html(response.title);
                $('#responseBody')
                    .html(response.body);
            });
        }

        return Control;
    }
);
