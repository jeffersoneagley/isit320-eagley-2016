define([require], function() {
    'use strict';

    var THREE = null;
    var pointerLockControls = null;
    var myCallback = null;
    var myButton = null;
    var debug = true;

    function PopupQuestion(threeInit) {
        THREE = threeInit;
        //pointerLockControls = pointerLockInit;
        if (debug) {
            console.log('initialized popupQuestion, three: ' + THREE + ' pointerLockControls:' + pointerLockControls);
        }
    }

    PopupQuestion.prototype.Show = function(question, optionsArray, route, onGuessMade) {
        myCallback = onGuessMade;
        var myPopup = $('<div>');
        myPopup.addClass('popup');
        myPopup.append($('<h1>')
            .html(question));
        var optionPanel = $('<div>');
        myPopup.append(optionPanel);
        for (var i = 0; i < optionsArray.length; i++) {
            var myButton = $('<button>');
            myButton.html(optionsArray[i].label);
            myButton.attr('guessValue', optionsArray[i].value);
            myButton.guessValue = optionsArray[i].value;
            myButton.click(function(e) {
                console.log($(this)
                    .attr('guessValue') + ' guessed');
                onGuessMade($(this)
                    .attr('guessValue'));
            });
            optionPanel.append(myButton);
        }
        myPopup.show();
        $('#popupArea')
            .append(myPopup);
    };

    return PopupQuestion;
});
