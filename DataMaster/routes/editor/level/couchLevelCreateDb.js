function couchNpcDbCreator(fishUtilities) {
    'use strict';
    var fs = require('fs');
    return {
        fillLevelData: function(nanodb, callback) {
            console.log('filling new level data to db');
            fishUtilities.fileOperations.readFiles('data/level/', function(err, data) {
                var newLevels = {
                    docs: []
                };
                for (var item in data) {
                    var myLevel = JSON.parse(data[item]);
                    myLevel.collection = 'levels';
                    newLevels.docs.push(myLevel);
                }
                nanodb.bulk(newLevels, callback);
            });
        }
    };
}

module.exports = couchNpcDbCreator;
