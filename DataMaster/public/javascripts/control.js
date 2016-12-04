define(['dbHandler', 'fishButtonHandler'],
    function(DbHandler, FishButtonHandler) {
        'use strict';
        var dbHandler = null;
        var fishButtonHandler = null;

        function Control() {
            dbHandler = new DbHandler();
            fishButtonHandler = new FishButtonHandler();
            Refresh();
        }

        function Refresh() {
            fishButtonHandler.RefreshButtonClickHandlers();
        }

        // var refreshFishRouteHandlers = function() {
        //     $('button[fishroute]')
        //         .unbind('click')
        //         .click(showPage);
        // };

        return Control;

    });
