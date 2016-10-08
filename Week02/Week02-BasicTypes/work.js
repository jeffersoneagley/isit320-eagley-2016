var fs = require('fs');

fs.readFile('myJSONTestData.json', 'utf8', function(err, rawData) {
    'use strict';
    if (err) {
        console.log(err);
        throw err;
    }
    var myData = JSON.parse(rawData);
    console.log(myData);
    console.log(typeof myData);
    console.log('Content:');
    for (var entry in myData) {
        if (myData.hasOwnProperty(entry)) {
            console.log(typeof myData[entry] + '\t' + entry + ':\t' + myData[entry]);
        }
    }
});
