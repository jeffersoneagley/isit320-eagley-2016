function EditorNpc(router, nano, dbName, myDbUtilities) {
    'use strict';
    var req = null;

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
        req.app.render('template/npcLine.jade', {
            'npc_name': npc.value.npc_name,
            'npc_id': npc.value.npc_id
        }, function(err, result) {
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
            var myEditorInterface = {
                'title': 'NPC Database',
                'body': htmlSnippet
            };
            callback(myEditorInterface);
        });
    }

    router.get('/editor/npc', function(request, response) {
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
}
module.exports = EditorNpc;
