define([require], function(_) {
    'use strict';
    return function(route, entryId, rev, changesInJson, callback) {
        var changeObject = {
            'id': entryId,
            'rev': rev,
            'changes': changesInJson
        };
        console.log(changeObject);
        $.get(route, changeObject, function(response, result) {
            console.log('dbUpdate returned ' + result);
            callback(response, result);
        });
    };

});
