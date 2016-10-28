define([require], function() {
    'use strict';
    var THREE = null;
    var myScore = 0;

    function Score(threeInit) {
        THREE = threeInit;
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

    return Score;
});
