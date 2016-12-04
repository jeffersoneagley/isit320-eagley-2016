define([require], function(_) {
    'use strict';
    return function(route, entryId, changesInJson, callback) {
        var changeObject = {
            'id': entryId,
            'changes': changesInJson
        };
        console.log(changeObject);
        $.getJSON(route, changeObject, function(err, result) {
            callback(err, result);
        });
    };

});
