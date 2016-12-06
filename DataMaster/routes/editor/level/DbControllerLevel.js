function DbControllerLevel() {
    'use strict';
    return {
        loadByDocID: function(mapDocId, nanodb, callback) {
            try {
                nanoDb.get(mapDocId, function(err, result) {
                    //console.log(result);
                    if (!err) {
                        console.log('successfully retrieved map ' + mapId + ':');
                        console.log(result);
                        callback(result);
                    } else {
                        console.log(err);
                        callback(err);
                    }
                });
            } catch (exc) {
                console.log(exc);
            }
        },
        getLevelList: function(nanodb, callback) {
            try {
                nanoDb.view('levelObjects', 'docLevelAllHeadersByLevelID', function(err, result) {
                    //console.log(result);
                    if (!err) {
                        console.log('successfully retrieved map ' + mapId + ':');
                        console.log(result);
                        callback(result);
                    } else {
                        console.log(err);
                        callback(err);
                    }
                });
            } catch (exc) {
                console.log(exc);
            }
        }
    };
}

module.exports = DbControllerLevel;
