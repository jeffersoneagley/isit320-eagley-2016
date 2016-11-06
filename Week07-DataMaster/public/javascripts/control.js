define([require],
    function() {
        'use strict';
        var myButtonPanel = $('#buttonPanelControls');

        function Control() {
            console.log('control launched');
            LoadRoute('/editor/');
        }

        function FillRoutes(myRoute) {
            $.getJSON(myRoute, function(response) {
                BuildRouteButtons(response.rows);
            });
        }

        function BuildRouteButtons(routelist) {
            if (routelist === 'locked') {
                myButtonPanel.empty();
            } else if (routelist !== undefined && routelist !== 'locked') {
                myButtonPanel.empty();
                for (var i = 0; i < routelist.length; i++) {
                    FillOneRoute(routelist[i]);
                }
            }
        }

        function FillOneRoute(myRouteEntry) {
            var myButton = $('<button>');
            myButton.html(myRouteEntry.buttonLabel);
            myButton.attr('class', 'btn btn-primary btn-lg btn-block');
            var myRoute = myRouteEntry.route;
            myButton.attr('myRouteToCall', myRoute);
            if (!myRouteEntry.isForNav) {
                myButton.click(function() {
                    LoadRoute(myRoute);
                });
            } else {
                myButton.click(function() {
                    FillRoutes(myRoute);
                });
            }
            myButtonPanel.append(myButton);
        }

        function LoadRoute(routeName) {
            console.log('Calling load ' + routeName);
            $.getJSON(routeName, function(response, result) {
                //console.log(response);
                $('#responseTitle')
                    .html(response.title);
                $('#responseBody')
                    .html(response.body);
                if (response.routelist !== undefined) {
                    BuildRouteButtons(response.routelist);
                }
                BindListButtons();
            });
        }

        function BindListButtons() {
            $('#responseBody')
                .find(':button')
                .each(function(index) {
                    var myRoute = $(this)
                        .attr('myroutetocall');
                    //console.log(myRoute);
                    $(this)
                        .click(function() {
                            LoadRoute(myRoute);
                        });
                });
        }

        return Control;
    }
);
