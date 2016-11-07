function EditorNpc(router, nano, dbName, myDbUtilities) {
    'use strict';
    var req = null;

    var routesNpcDatabase = [{
        'buttonLabel': 'Exit Npcs',
        'route': '/editor/'
    }, {
        'buttonLabel': 'Npc: delete db',
        'routes': ['/deleteDb', '/editor/npc/list'],
        'cssclass': 'btn btn-danger'
    }, {
        'buttonLabel': 'Npc: create',
        'routes': ['/createDb', '/editor/npc/list']
    }, {
        'buttonLabel': 'Npc: design docs',
        'routes': ['/designDoc', '/editor/npc/list']
    }, {
        'buttonLabel': 'Npc: fill data',
        'routes': ['/insertBulk?fileName=NpcBackup.json', '/editor/npc/list']
    }, {
        'buttonLabel': 'Refresh',
        'route': '/editor/npc/list',
        'cssclass': 'btn btn-info'
    }];

    function BuildNpcListHtml(callback) {
        myDbUtilities.npc.ReadNpcAllByID(nano, dbName, function(data, result) {
            //console.log('ReadNpcAllByID complted');
            //console.log(data);
            var myResponse = '';
            if (result) {
                callback('<h3 class="alert alert-warning">No db data found!</h3>');
            } else {
                for (var row in data.rows) {
                    BuildNpcListElement(data.rows[row], function(htmlText) {
                        myResponse += (htmlText);
                    });
                }
                callback(myResponse);
            }
        });
    }

    function BuildNpcListElement(npc, callback) {
        console.log(npc);
        req.app.render('template/npcLine.jade', npc.value, function(err, result) {
            //console.log(result);
            if (!err) {
                callback(result);
            } else {
                console.log(err);
                throw err;
            }
        });
    }

    function onNpcListRecieved(callback) {

        BuildNpcListHtml(function(htmlSnippet) {
            var myEditorInterface = myDbUtilities.wrapTitleAndBody('NPC Database', htmlSnippet, routesNpcDatabase);
            callback(myEditorInterface);
        });
    }

    router.get('/editor/npc/list', function(request, response) {
        try {
            console.log('editor/npc called');
            req = request;
            onNpcListRecieved(function(result) {
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

    router.get('/editor/npc/update/', function(request, response) {
        try {

            console.log('/editor/npc/update/');
            console.log(request.query);

            myDbUtilities.npc.UpdateNpcEntry(request.query.id, request.query.changes, nano, dbName, function(err, DBResonse) {

                var result = myDbUtilities.wrapTitleAndBody('Update result', DBResonse, [{
                    'buttonLabel': 'ok',
                    'cssclass': 'btn btn-accept',
                    'route': '/editor/npc/list'
                }]);

                response.send(result);
            });

        } catch (e) {
            console.log(e);
        }
    });

    router.get('/editor/npc/:id', function(request, response) {
        console.log('edit npc ' + request.params.id + ' called');
        try {

            myDbUtilities.npc.ReadSingleNpcByID(request.params.id, nano, dbName, function(npc) {
                console.log(npc);
                request.app.render('./template/npcEditSingle.jade', npc, function(err, htmlSnippet) {
                    if (err) {
                        throw err;
                    }
                    var myEditorInterface = myDbUtilities.wrapTitleAndBody('Edit Npc ' + npc.npc_id, htmlSnippet, 'locked');
                    console.log(myEditorInterface);
                    response.send(myEditorInterface);
                });
            });
        } catch (e) {
            console.log(e);
        }
    });
}
module.exports = EditorNpc;
