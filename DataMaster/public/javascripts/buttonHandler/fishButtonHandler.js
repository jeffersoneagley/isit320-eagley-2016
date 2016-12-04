define('fishButtonHandler', [require, './fishSubmitDb', './fishButtonRouteHandlers',
        './fishShowPageFragment', './fishNavLoginHandler'
    ],
    function(_, fishSubmitDb, fishButtonRouteHandlers, FishShowPageFragment, fishNavLoginHandler) {
        'use strict';
        var fishShowPageFragment = null;

        function FishButtonHandler() {
            fishShowPageFragment = new FishShowPageFragment(this);
        }

        FishButtonHandler.prototype.RefreshButtonClickHandlers = function() {
            fishNavLoginHandler(fishShowPageFragment, fishButtonRouteHandlers);
            fishSubmitDb(fishShowPageFragment);
            fishButtonRouteHandlers(fishShowPageFragment);
        };

        return FishButtonHandler;
    });
