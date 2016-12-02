function DbControllerDb() {
    'use strict';
    var dbManager = {
        listAllDb: function(nano, callback) {
            nano.db.list(function(err, body) {
                callback(body);
            });
        }
    };

    return dbManager;
}

module.exports = DbControllerDb;
