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

    DrawHud.prototype.AttachRefreshFunction = function(refreshFunction) {
        myRefreshFunctions.push(refreshFunction);
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
                    myLine.html(myRefreshFunctions[functionId]());
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
