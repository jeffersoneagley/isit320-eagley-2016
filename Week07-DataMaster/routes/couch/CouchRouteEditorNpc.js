function EditorNpc(router, nano, dbName, myDbUtilities) {
    'use strict';
    var req = null;

    var routesNpcDatabase = [{
        'buttonLabel': 'Exit Npcs',
        'route': '/editor/'
    }];

    function BuildNpcListHtml(callback) {
        myDbUtilities.npc.ReadNpcAllByID(nano, dbName, function(data, result) {
            //console.log('ReadNpcAllByID complted');
            //console.log(data);
            var myResponse = '';
            for (var row in data.rows) {
                BuildNpcListElement(data.rows[row], function(htmlText) {
                    myResponse += (htmlText);
                });
            }
            callback(myResponse);
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

    router.get('/editor/npclist', function(request, response) {
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
