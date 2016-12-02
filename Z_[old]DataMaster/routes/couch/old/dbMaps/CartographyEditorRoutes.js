function EditorMap(router, nano, dbName) {
    'use strict';
    var req = null;

    var routesMapDatabase = [{
        'buttonLabel': 'Exit Maps',
        'route': '/editor/'
    }, {
        'buttonLabel': 'Map: delete db',
        'routes': ['/deleteDb', '/editor/map/list'],
        'cssclass': 'btn btn-danger'
    }, {
        'buttonLabel': 'Map: create',
        'routes': ['/createDb', '/editor/map/list']
    }, {
        'buttonLabel': 'Map: design docs',
        'routes': ['/designDoc', '/editor/map/list']
    }, {
        'buttonLabel': 'Map: fill data',
        'routes': ['/insertBulk?fileName=MapBackup.json', '/editor/map/list']
    }, {
        'buttonLabel': 'Refresh',
        'route': '/editor/map/list',
        'cssclass': 'btn btn-info'
    }];

    function BuildMapListHtml(callback) {
        myDbUtilities.map.ReadMapAllByID(nano, dbName, function(data, result) {
            //console.log('ReadMapAllByID complted');
            //console.log(data);
            var myResponse = '';
            if (result) {
                callback('<h3 class="alert alert-warning">No db data found!</h3>');
            } else {
                for (var row in data.rows) {
                    BuildMapListElement(data.rows[row], function(htmlText) {
                        myResponse += (htmlText);
                    });
                }
                callback(myResponse);
            }
        });
    }

    function BuildMapListElement(map, callback) {
        console.log(map);
        req.app.render('template/mapLine.pug', map.value, function(err, result) {
            //console.log(result);
            if (!err) {
                callback(result);
            } else {
                console.log(err);
                throw err;
            }
        });
    }

    function listBuildCreateNewMapButton(callback) {
        var mySection = '<div class=\'alert alert-info row\'>' +
            '<div class=\'lead col-sm-6 col-xs-3\'>Create new map</div>' +
            '<button class=\'btn btn-primary btn-lg\' ' +
            '  jeffersonDbRouteToCall = \'/editor/map/new\'' +
            'id = \'buttonMapNew\' ><span style=\'font-weight:bold\'>+</span>' +
            ' Create New </button> </div>';

        callback(mySection);
    }

    function onMapListRecieved(callback) {

        listBuildFinalPage(function(result) {

            var myEditorInterface = myDbUtilities.wrapTitleAndBody('Map Database', result, routesMapDatabase);
            callback(myEditorInterface);
        });
    }

    function listBuildMapList(callback) {
        BuildMapListHtml(function(htmlSnippet) {

            callback(htmlSnippet);
        });
    }

    function listBuildFinalPage(callback) {
        var sectionNewMap = null;
        var sectionMapList = null;
        listBuildMapList(function(myMapListInterfaceSection) {
            sectionMapList = myMapListInterfaceSection;
            if (sectionMapList !== null && sectionNewMap !== null) {
                callback(sectionNewMap + sectionMapList);
            }
        });
        listBuildCreateNewMapButton(function(myNewMapInterfaceSection) {
            sectionNewMap = myNewMapInterfaceSection;
            if (sectionMapList !== null && sectionNewMap !== null) {
                callback(sectionNewMap + sectionMapList);
            }
        });
    }

    router.get('/list', function(request, response) {
        try {
            console.log('editor/map called');
            req = request;

            onMapListRecieved(function(result) {
                response.send(result);
            });
        } catch (e) {
            console.log(e);
            response.send({
                'title': 'err',
                'body': JSON.stringify(e)
            });
        } finally {

        }
    });

    router.get('/update/', function(request, response) {
        try {

            console.log('/editor/map/update/');
            console.log(request.query);

            myDbUtilities.map.UpdateMapEntry(request.query.id, request.query.changes, nano, dbName, function(err, DBResonse) {
                var myReply = '';
                if (err !== undefined && err !== null) {
                    myReply = '<div class="alert-warning"><h2>Something went wrong saving to the database!</h2>' +
                        '<p>Contact the database administrator immediately and tell them your insert command failed</p></div>';
                } else {
                    myReply = '<div class="alert-success">Succssfully updated Map!</div>';
                }
                var result = myDbUtilities.wrapTitleAndBody('Update result', myReply, [{
                    'buttonLabel': 'ok',
                    'cssclass': 'btn btn-accept',
                    'route': '/editor/map/list'
                }]);

                response.send(result);
            });

        } catch (e) {
            console.log(e);
        }
    });

    router.get('/:id', function(request, response) {
        console.log('edit map ' + request.params.id + ' called');
        try {

            myDbUtilities.map.ReadSingleMapByID(request.params.id, nano, dbName, function(map) {
                console.log('map single recieved:');
                console.log(map);
                request.app.render('./template/mapEditSingle.pug', map, function(err, htmlSnippet) {
                    if (err) {
                        throw err;
                    }
                    var myEditorInterface = myDbUtilities.wrapTitleAndBody('Edit Map ' + map.map_id, htmlSnippet, 'locked');
                    console.log(myEditorInterface);
                    response.send(myEditorInterface);
                });
            });
        } catch (e) {
            console.log(e);
        }
    });
}
module.exports = EditorMap;
