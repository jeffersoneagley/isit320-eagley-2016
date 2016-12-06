function fileOperations() {
    'use strict';
    var fs = require('fs');
    var fileOperator = {

    };

    fileOperator.readFiles = function(dirname, callback) {
        fs.readdir(dirname, function(err, filenames) {
            // console.log('readfiles errstatus:' + err);
            // console.log(filenames);
            if (err) {
                callback(_, err);
                return;
            }
            var resultDocs = {};
            var error;
            var docsLoaded = 0;
            filenames.forEach(function(filename) {
                fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                    if (err) {
                        if (!errors) {
                            errors = 'result: ';
                        }
                        console.log(err);
                        errors += err;
                    }
                    if (content) {
                        resultDocs[filename] = content;
                    }
                    docsLoaded++;
                    if (docsLoaded >= filenames.length) {
                        callback(error, resultDocs);
                    }
                });
            });
        });
    };

    // fileOperator.getData = function(pathToDirectory, callback) {
    //     var data = {};
    //     var resultErr = 'result:';
    //     fileOperator.readFiles(pathToDirectory, function(result, err) {
    //         data[filename] = content;
    //     }, function(err) {
    //         resultErr += err;
    //         console.log(err);
    //     });
    // };

    return fileOperator;
}
module.exports = fileOperations();
