define(['dbHandler'], function(DbHandler) {
    'use strict';
    var Refresh = function() {
        var dbHandler = new DbHandler();
        var updateButton = null;
        if ($('#fishButtonUpdateDb') !== undefined) {
            updateButton = $('#fishButtonUpdateDb');
        }
        updateButton
            .click(function() {
                var changesInJson = {};
                $('#responseBody')
                    .find('[fishDbCouchProperty]')
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
                    updateButton.attr('fishDbSubmitRoute'),
                    updateButton.attr('fishDbEntryId'),
                    changesInJson,
                    function(response, result) {
                        console.log(response);
                        console.log(result);
                        LoadRecievedDataToPage(response, result);
                    }
                );
            });
    };

    return Refresh;
});
