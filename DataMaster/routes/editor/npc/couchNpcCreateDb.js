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
                var npcList = JSON.parse(json);
                for (var npc in npcList.docs) {
                    if (npcList.docs.hasOwnProperty(npc)) {
                        npcList.docs[npc].collection = 'npcs';
                    }
                }
                nano.db.use(dbName)
                    .bulk(npcList, callback);
            });
        }
    };
}

module.exports = couchNpcDbCreator();
