define([require], function() {
    'use strict';

    var THREE = null;
    var pointerLockControls = null;
    var myCallback = null;
    var myButton = null;
    var myPopup = null;
    var debug = true;

    function PopupQuestion(threeInit) {
        THREE = threeInit;
        //pointerLockControls = pointerLockInit;
        if (debug) {
            console.log('initialized popupQuestion, three: ' + THREE + ' pointerLockControls:' + pointerLockControls);
        }
    }

    PopupQuestion.prototype.Update = function(innerHtml) {
        myPopup.html(innerHtml);
    };

    PopupQuestion.prototype.Kill = function() {
        myPopup.empty();
        myPopup.hide();
    };

    PopupQuestion.prototype.ShowOptionsDialog = function(question, optionsArray, route, onGuessMade) {
        myPopup = $('<div>');
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
            myButton.click(optionButtonClickHandler(onGuessMade));
            optionPanel.append(myButton);
        }
        myPopup.show();
        $('#popupArea')
            .append(myPopup);
    };

    var optionButtonClickHandler = function(onGuessMade) {
        //console.log($(this).attr('guessValue') + ' guessed');
        console.log('optionButtonClickHandler');
        return function() {
            console.log(onGuessMade);
            onGuessMade($(this)
                .attr('guessValue'));
        };
    };

    PopupQuestion.prototype.OkButton = function(onOkPressed) {
        console.log('ok setup');
        var buttonPanel = $('<div>');
        var buttonOk = $('<button>');
        buttonOk.html('Ok!');
        buttonPanel.append(buttonOk);
        myPopup.append(buttonPanel);
        var scope = this;
        buttonOk.click(function() {

            scope.okButtonPress(onOkPressed);
        });

    };

    PopupQuestion.prototype.okButtonPress = function(onOkPressed) {
        if (
            onOkPressed !== undefined &&
            typeof (onOkPressed) === 'function'
        ) {
            onOkPressed();
        }
        PopupQuestion.prototype.Kill();
    };

    PopupQuestion.prototype.ShowOkDialog = function(title, message, onOkPressed) {
        myPopup.html($('<h1>')
            .html(title));
        myPopup.append($('<p>')
            .html(message));
        this.OkButton(onOkPressed);
    };

    return PopupQuestion;
});
