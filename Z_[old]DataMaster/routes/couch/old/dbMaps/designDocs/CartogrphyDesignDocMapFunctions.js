function MapsDesignDocMapFunctions() {
    'use strict';
    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    // var docMapSpecificID = function(map, map_id) {
    //     if (map._id === map_id) {
    //         emit(map);
    //     }
    // };

    var docMapAllByID = function(map) {
        emit(map._id, {
            '_id': map._id,
            '_rev': map._rev,
            'name': map.name,
            'description': map.description,
            'nextMapId': map.nextMapId,
            'gridStructures': map.gridStructures,
            'gridNpcs': map.gridNpcs
        });
    };

    var docMapAllHeadersByID = function(map) {
        emit(map._id, {
            '_id': map._id,
            '_rev': map._rev,
            'name': map.name,
            'description': map.description,
            'nextMap': map.nextMap
        });
    };

    module.exports = {
        'docAllMapsByID': {
            'map': docMapAllByID
        },
        'docAllMapHeadersByID': {
            'map': docMapAllHeadersByID
        }
    };

}
