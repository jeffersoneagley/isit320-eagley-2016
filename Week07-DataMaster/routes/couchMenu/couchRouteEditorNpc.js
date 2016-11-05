function EditorNpc(router) {
    'use strict';

    function BuildNpcListHtml() {
        return 'derp';
    }

    function BuildNpcListElement() {
        return app.render('template/npcLine.jade', {
            'npc_name': 'myName',
            'npc_id': 1
        }, function functionName() {

        });
    }

    router.get('/editor/npc', function(request, response) {
        var myEditorInterface = {
            'title': 'NPC Database',
            'body': BuildNpcListHtml()
        };
        console.log(myEditorInterface);
        response.send(myEditorInterface);
    });
}
module.exports = EditorNpc;
