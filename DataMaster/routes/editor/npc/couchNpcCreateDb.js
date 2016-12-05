function couchNpcDbCreator() {
    'use strict';
    var fs = require('fs');
    return {

        createNpcDatabase: function(nano, dbName, callback) {
            nano.db.create(dbName, callback);
        },
        fillNpcData: function(nano, dbName, callback) {
            console.log('bulk data');
            var record = fs.readFile('data/npcbackup.json', 'utf8', function(err, json) {
                console.log('Reading file');
                console.log(json);
                nano.db.use(dbName)
                    .bulk(JSON.parse(json), callback);
            });
        }
    };
}

module.exports = couchNpcDbCreator();
