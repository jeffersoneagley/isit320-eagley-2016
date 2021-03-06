var fs = require('fs');
var getData = function() {
    'use strict';
    var myData;
    /*jshint esnext: true */

    fs.readFile('./data/myJSONTestData.json', 'utf8', (err, rawData) => {
        if (err) {
            console.log(err);
            throw err;
        }
        myData = JSON.parse(rawData);
        console.log(myData);
        console.log(typeof myData);
        console.log('Content:');
        for (var entry in myData) {
            if (myData.hasOwnProperty(entry)) {
                console.log(typeof myData[entry] + '\t' + entry + ':\t' + myData[entry]);
            }
        }
    });
    return myData;
};
console.log('Beginning reading file');

module.exports = getData;
