function EditorNpc(router) {
    'use strict';

    var req = null;

    function BuildNpcListHtml(callback) {
        BuildNpcListElement({
            'name': 'derp',
            'npc_id': 1
        }, function(htmlText) {
            callback(htmlText);
        });
    }

    function BuildNpcListElement(npc, callback) {
        req.app.render('template/npcLine.jade', {
            'npc_name': npc.name,
            'npc_id': npc.npc_id
        }, function(err, result) {
            console.log(result);
            if (!err) {
                callback(result);
            } else {
                console.log(err);
                throw err;
            }
        });
    }

    function onNpcListRecieved(dataFromDb) {

        BuildNpcListHtml(function(htmlSnippet) {
            var myEditorInterface = {
                'title': 'NPC Database',
                'body': htmlSnippet
            };
            console.log(myEditorInterface);
            response.send(myEditorInterface);
        });
    }

    router.get('/editor/npc', function(request, response) {
        try {
            console.log('editor/npc');
            req = request;
            req.app.get('/docNpcAllByID', function(thing1, thing2) {
                console.log('polling against db');
                console.log(thing1);
                console.log(thing2);
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
