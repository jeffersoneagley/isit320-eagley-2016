module.exports = function(designDocument, designName, response) {
    'use strict';
    console.log('createDesignDocument');
    console.log('createDesignDocument(' + designDocument + ', ' +
        designName + ', ' +
        response + ')');
    var nanoDb = nano.db.use(dbName);
    nanoDb.insert(designDocument, designName, function(error, body) {
        if (!error) {
            console.log(body);
            response.send(body);
        } else {
            console.log('error: ' + error);
            response.send({
                'Result': 'The document might already exist. ' + error
            });
        }
    });
};
