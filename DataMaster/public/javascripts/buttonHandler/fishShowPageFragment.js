define([require], function(_) {
    'use strict';
    var fishButtonHandler = null;
    var activateViewCountSystem = false; //set to true to turn on view counts, caution, throws meaningless get errors.
    var authenticatedOnPreviousTick = null;

    function FishShowPageFragment(FishButtonHandler) {
        fishButtonHandler = FishButtonHandler;
    }

    var getViews = function(myRoute) {
        if (activateViewCountSystem) {
            $.getJSON('/views' + myRoute, function(response) {
                    console.log('/views/' + myRoute);
                    $('#viewcount')
                        .html(response.result);
                })
                .fail(function() {
                    //not tracking views for this route
                });
        }
    };

    var RefreshFunctions = function() {
        fishButtonHandler.RefreshButtonClickHandlers();
    };

    FishShowPageFragment.prototype.ShowPageFromHtml = function(sourceHtml) {
        $('#responseArea')
            .html(sourceHtml);
        window.location = '#';
        RefreshFunctions();
    };

    FishShowPageFragment.prototype.ShowPageFromRoute = function(myRoute) {
        $.get(myRoute, function(response, result) {
                FishShowPageFragment.prototype.ShowPageFromHtml(response);
                $('#debug')
                    .html(JSON.stringify(result));
                if (activateViewCountSystem) {
                    getViews(myRoute);
                }
                if (result === 'success') {
                    $('#debug')
                        .attr('class', 'alert alert-success');

                } else {
                    $('#debug')
                        .attr('class', 'alert alert-warning');
                }
            })
            .fail(function(jq, status, error) {
                window.location = '#debug';
                $('#debug')
                    .attr('class', 'alert alert-warning');
                $('#debug')
                    .html('error: ' + jq.responseText);
                console.log('error: ', status);
                console.log('error: ', error);
            });
    };

    FishShowPageFragment.prototype.ClickHandler = function() {
        var myRoute = $(this)
            .attr('fishroute');
        FishShowPageFragment.prototype.ShowPageFromRoute(myRoute);
    };
    return FishShowPageFragment;
});
