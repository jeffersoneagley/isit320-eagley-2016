define(['dbHandler'], function(DbHandler) {
    'use strict';
    var Refresh = function(fishShowPageFragment) {
        var dbHandler = new DbHandler();
        var updateButton = null;
        if ($('#fishButtonUpdateDb') !== undefined) {
            updateButton = $('#fishButtonUpdateDb');
            updateButton
                .click(function() {
                    var changesInJson = {};
                    $('[fishDbCouchProperty]')
                        .each(
                            function() {
                                var original = $(this)
                                    .prop('defaultValue');
                                var current = $(this)
                                    .get(0)
                                    .value;
                                if (original !== current) {
                                    var myProperty = $(this)
                                        .attr('fishDbCouchProperty');
                                    console.log(myProperty);
                                    console.log($(this));
                                    changesInJson[myProperty] = current;
                                }

                            }
                        );
                    dbHandler.updateDbEntry(
                        updateButton.attr('fishDbSubmitRoute'),
                        updateButton.attr('fishDbEntryId'),
                        updateButton.attr('fishDbEntryRev'),
                        changesInJson,
                        function(response, result) {

                            ProcessUpdate(response, result, fishShowPageFragment);
                        }
                    );
                });
        }
    };

    var ProcessUpdate = function(response, result, fishShowPageFragment) {
        if (result === 'success') {
            $('#debug')
                .html('Updated successfully!');
            console.log(response);
            fishShowPageFragment.ShowPageFromHtml(response);
        } else {
            $('#debug')
                .html('Something went wrong! Did you make any changes?');
        }

    };

    return Refresh;
});
