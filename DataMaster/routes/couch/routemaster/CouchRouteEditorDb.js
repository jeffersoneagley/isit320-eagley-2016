function EditorNpc(router, nano, myDbUtilities) {
    'use strict';
    var req = null;

    var routesDbsDatabase = [{
        'buttonLabel': 'Exit Dbs',
        'route': '/editor/'
    }];

    function makeList(dbArray, request, callback) {
        var htmlResult = '';
        /*jshint loopfunc: true */
        for (var db in dbArray) {
            makeRow(dbArray[db], request, function(result) {
                htmlResult += result;
            });
        }
        console.log('htmlResult');
        console.log(htmlResult);
        callback(htmlResult);
    }

    function makeRow(dbData, request, callback) {
        request.app.render('./template/dbLine.pug', dbData, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(result);
        });
    }

    router.get('/editor/db/list', function(request, response) {
        myDbUtilities.db.listAllDb(nano, function(result, error) {
            var dbNameList = {};
            for (var db in result) {
                dbNameList[db] = {};
                dbNameList[db].name = result[db];
            }
            makeList(dbNameList, request, function(htmlSnippet) {
                var myEditorInterface = myDbUtilities.wrapTitleAndBody(
                    'Database stats',
                    htmlSnippet,
                    routesDbsDatabase);
                console.log(myEditorInterface);
                response.send(myEditorInterface);
            });
        });
    });
}
module.exports = EditorNpc;;
