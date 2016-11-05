function CouchRouteMaster(router, nano, dbName, myDbUtilities) {
    'use strict';
    //var dbControllerNpc = require('./controller/DbControllerNpc');
    //console.log(dbControllerNpc);
    var couchRouteEditorNpc = require('./CouchRouteEditorNpc')(router, nano, dbName, myDbUtilities);

    router.get('/getCouchRoutes', function(request, response) {
        console.log('getCouchRoutes called');
        var myRouteList = {
            'rows': [{
                'buttonLabel': 'NPCs',
                'route': '/editor/npc'
            }, {
                'buttonLabel': 'Levels',
                'route': '/editor/level'
            }, {
                'buttonLabel': 'Databases',
                'route': '/editor/db'
            }]
        };
        response.send(myRouteList);
    });

}
module.exports = CouchRouteMaster;
