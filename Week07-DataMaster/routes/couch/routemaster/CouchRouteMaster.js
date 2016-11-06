function CouchRouteMaster(router, nano, dbName, myDbUtilities) {
    'use strict';

    var myMasterRouteList = [{
        'buttonLabel': 'NPCs',
        'route': '/editor/npc/list'
    }, {
        'buttonLabel': 'Levels',
        'route': '/editor/level'
    }, {
        'buttonLabel': 'Databases',
        'route': '/editor/db/list'
    }];

    require('./CouchRouteEditorNpc')(router, nano, dbName, myDbUtilities);
    require('./CouchRouteEditorDb')(router, nano, myDbUtilities);
    myDbUtilities.wrapTitleAndBody = function(title, body, navRoutes) {
        var result = {
            'title': title,
            'body': body
        };

        if (navRoutes !== undefined) {
            result.routelist = navRoutes;
        }
        return result;
    };

    router.get('/getCouchRoutes', function(request, response) {
        console.log('getCouchRoutes called');
        response.send(myMasterRouteList);
    });

    router.get('/editor/', function(request, response) {
        var myHtml = myDbUtilities.wrapTitleAndBody('Welcome', 'Select a button on the left', myMasterRouteList);
        response.send(myHtml);
    });

}
module.exports = CouchRouteMaster;
