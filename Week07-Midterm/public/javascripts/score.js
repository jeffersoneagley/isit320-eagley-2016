define([require], function() {
    'use strict';
    var THREE = null;
    var myScore = 0;
    var debug = false;
    var myDisplayString = 'score: ';

    function Score(threeInit, displayString) {
        THREE = threeInit;
        myDisplayString = displayString || myDisplayString;
    }

    Score.prototype.ScorePoints = function(amount) {
        amount = amount || 1;
        myScore += amount;
    };
    Score.prototype.RemovePoints = function(amount) {
        amount = amount || 1;
        ScorePoints(-amount);
    };

    Score.prototype.GetScore = function() {
        return myScore;
    };

    Score.prototype.GetScoreText = function() {
        if (debug) {
            console.log('GetScoreText called ' + myDisplayString + myScore);
        }
        return myDisplayString + myScore;
    };

    return Score;
});
