define([require], function() {
    'use strict';
    var THREE = null;

    var myRefreshFunctions = [];

    function DrawHud(threeInit) {
        THREE = threeInit;
        /*$('#gameHud')
            .append($('<div>')
                .attr('id', 'hudMessages'));*/
    }

    DrawHud.prototype.AttachRefreshFunction = function(sourceObject, functionToCall) {
        var refreshObject = {
            'source': sourceObject,
            'function': functionToCall
        };
        myRefreshFunctions.push(refreshObject);
    };

    //DrawHud.prototype.OnHudRefresh = new Event('OnHudRefresh');

    DrawHud.prototype.RefreshHud = function() {
        /*$('#cameraX')
            .html(Number(Math.round(position.x / size)));
        $('#cameraZ')
            .html(Number(Math.round(position.z / size)));*/
        $('#hudMessages')
            .empty();
        if (myRefreshFunctions.length > 0) {
            for (var functionId in myRefreshFunctions) {
                try {
                    var myLine = $('<p>');
                    myLine.attr('id', 'hudElement' + functionId);
                    //console.log(myRefreshFunctions[functionId].source[myRefreshFunctions[functionId].function]);
                    var myText = myRefreshFunctions[functionId].source[myRefreshFunctions[functionId].function]();
                    //console.log(myText);
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
