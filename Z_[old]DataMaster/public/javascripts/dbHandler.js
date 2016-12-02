define([require], function() {
    'use strict';

    function DbHandler() {

    }

    DbHandler.prototype.updateDbEntry = function(route, entryId, changesInJson, callback) {
        var changeObject = {
            'id': entryId,
            'changes': changesInJson
        };
        console.log(changeObject);
        $.getJSON(route, changeObject, function(err, result) {
            callback(err, result);
        });
    };
    return DbHandler;
});
