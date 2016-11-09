define(['dbHandler'],
    function(DbHandler) {
        'use strict';
        var myButtonPanel = $('#buttonPanelControls');
        var dbHandler = null;

        function Control() {
            dbHandler = new DbHandler();
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

            if (myRouteEntry.routes !== undefined) {
                //multiple routes to call
                var myRouteList = myRouteEntry.routes;
                myButton.click(function() {
                    var callbackFunction = null;
                    for (var i = 0; i < myRouteList.length; i++) {
                        LoadRoute(myRouteList[i]);
                    }

                });
            } else if (myRouteEntry.route !== undefined) {
                //single route to call

                var myRoute = myRouteEntry.route;
                myButton.attr('jeffersonDbRouteToCall', myRoute);
                myButton.click(function() {

                    LoadRoute(myRoute);
                });
            }
            if (myRouteEntry.cssclass !== undefined) {
                myButton.addClass(myRouteEntry.cssclass);
            }
            myButtonPanel.append(myButton);
        }

        function LoadRoute(routeName, callback) {
            console.log('Calling load ' + routeName);
            $.getJSON(routeName, function(response, result) {
                LoadRecievedDataToPage(response, result);
                if (callback !== undefined) {
                    callback(response, result);
                }
            });
        }

        function LoadRecievedDataToPage(response, result) {
            $('#responseTitle')
                .html(response.title);
            $('#responseBody')
                .html(response.body);
            if (response.routelist !== undefined) {
                BuildRouteButtons(response.routelist);
            }
            BindListButtons();
        }

        function BindListButtons() {
            $('#responseBody')
                .find(':button')
                .each(function(index) {
                    var myRoute = $(this)
                        .attr('jeffersonDbRouteToCall');
                    console.log($(this));
                    console.log(myRoute);
                    $(this)
                        .click(function() {
                            LoadRoute(myRoute);
                        });
                });
            var updateButton = $('#buttonUpdateDb');
            if (updateButton !== undefined) {
                updateButton.click(function() {
                    var changesInJson = {};
                    $('#responseBody')
                        .find('[jeffersonDbCouchProperty]')
                        .each(
                            function() {
                                var original = $(this)
                                    .prop('defaultValue');
                                var current = $(this)
                                    .get(0)
                                    .value;
                                console.log(original);
                                console.log(current);
                                if (original !== current) {
                                    var myProperty = $(this)
                                        .attr('jeffersonDbCouchProperty');
                                    changesInJson[myProperty] = current;
                                }

                            }
                        );
                    dbHandler.updateDbEntry(
                        updateButton.attr('jeffersonDbSubmitRoute'),
                        updateButton.attr('jeffersonDbEntryId'),
                        changesInJson,
                        function(response, result) {
                            console.log(response);
                            console.log(result);
                            LoadRecievedDataToPage(response, result);
                        }
                    );
                });
            }
        }

        return Control;
    }
);
