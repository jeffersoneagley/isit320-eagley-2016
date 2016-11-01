define([require], function() {
    'use strict';
    var THREE = null;
    var debug = false;

    function Score(threeInit, displayString) {
        THREE = threeInit;
        this.myDisplayString = displayString || myDisplayString;
        this.myScore = 0;
    }

    Score.prototype.ScorePoints = function(amount) {
        amount = amount || 1;
        this.myScore += amount;
    };
    Score.prototype.RemovePoints = function(amount) {
        amount = amount || 1;
        this.ScorePoints(-amount);
    };

    Score.prototype.GetScore = function() {
        return this.myScore;
    };

    Score.prototype.GetScoreText = function() {
        if (debug) {
            console.log('GetScoreText called ' + this.myDisplayString + this.myScore);
        }
        return '' + this.myDisplayString + this.myScore;
    };

    return Score;
});
