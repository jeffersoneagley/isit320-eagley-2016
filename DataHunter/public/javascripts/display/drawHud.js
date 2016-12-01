define([require], function() {
    'use strict';
    var THREE = null;

    var myRefreshFunctions = [];

    function DrawHud(threeInit) {
        THREE = threeInit;
    }

    DrawHud.prototype.AttachRefreshFunction = function(sourceObject, functionToCall) {
        var refreshObject = {
            'source': sourceObject,
            'function': functionToCall
        };
        myRefreshFunctions.push(refreshObject);
    };

    DrawHud.prototype.RefreshHud = function() {
        $('#hudMessages')
            .empty();
        if (myRefreshFunctions.length > 0) {
            for (var functionId in myRefreshFunctions) {
                try {
                    var myLine = $('<p>');
                    myLine.attr('id', 'hudElement' + functionId);
                    var myText = myRefreshFunctions[functionId].source[myRefreshFunctions[functionId].function]();
                    myLine.html(myText);
                    $('#hudMessages')
                        .append(myLine);
                } catch (exc) {
                    console.log(exc);
                }
            }
        }
    };

    return DrawHud;
});
