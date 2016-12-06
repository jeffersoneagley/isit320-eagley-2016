///asynchronously load all the modules to the utility belt
function fishUtilities(onComplete) {
    'use strict';
    var itemsIntialized = 0;

    var config = {
        'fileOperations': './fileOperations'
    };

    var result = {};

    // function checkLoadComplete() {
    //     //console.log(itemsIntialized);
    //     if (itemsIntialized >= config.length) {
    //         return result;
    //     }
    // }
    //
    // function asyncLoadModule(item) {
    //     result[item] = require(config[item]);
    //     console.log(result);
    //     itemsIntialized++;
    //     checkLoadComplete();
    // }

    for (var item in config) {
        console.log('attempting to initialize ' + item);
        if (config.hasOwnProperty(item)) {
            result[item] = require(config[item]);
        } else {
            console.log('error initializing ' + item);
        }
    }
    return result;
}

module.exports = fishUtilities;
