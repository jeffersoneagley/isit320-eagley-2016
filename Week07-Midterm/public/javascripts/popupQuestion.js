define([require], function() {
    'use strict';

    var THREE = null;
    var pointerLockControls = null;
    var myCallback = null;
    var myButton = null;

    function PopupQuestion(threeInit, pointerLockinit) {
        THREE = threeInit;
        pointerLockControls = pointerLockinit;
    }

    PopupQuestion.prototype.Show = function(question, route, onGuessMade) {
        myCallback = onGuessMade;
    };

    return PopupQuestion;
});
