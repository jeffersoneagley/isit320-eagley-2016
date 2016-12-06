define([], function() {
    'use strict';
    var currentLevel = null;

    function getLevel(levelId, callback) {
        $.getJSON('/level/load/' + levelId, function(responseData, err) {
            if (!err) {

            } else {
                console.log(err);
            }
            currentLevel = responseData;

            callback(responseData);
        });
    }

    function addObjectGridToScene(scene, camera, objectKey, objectGrid) {

        for (var i = 0; i < objectGrid.length; i++) {
            for (var j = 0; j < objectGrid[i].length; j++) {
                var cellIndexOfObject = parseInt(objectGrid[i][j]);
                var cellObject = objectKey[cellIndexOfObject];
                if (cellObject !== null && cellObject !== undefined) {
                    addObjectToScene(scene, camera, cellObject, (size * i), (size * j));
                }
            }
        }
    }

    function addobjectToScene(scene, camera, objectToAdd, xpos, zpos) {

    }

    function addSpheres(scene, camera, wireFrame) {

        var data = readIntialNpcSetupFromDatabase(function(err, data) {
            if (!err) {
                var npcList = {};
                for (var i = 0; i < data.length; i++) {
                    var npcEntry = data[i].value;
                    npcList[npcEntry.npc_id] = npcEntry;
                }
                fishyMap.BindKeyNpcColors(npcList);
                $.getJSON('npcs000.json', function(grid) {
                    fishyMap.BindNpcMap(grid);
                    for (var i = 0; i < grid.length; i++) {
                        for (var j = 0; j < grid[i].length; j++) {
                            if (grid[i][j] !== 0) {
                                npcEngine.addNpc(scene, camera, false,
                                    (size * i), (size * j), size,
                                    data[grid[i][j] - 1].value.color,
                                    data[grid[i][j] - 1].value.npc_id
                                );
                            }
                        }
                    }
                });
            } else {
                console.log('Failed to load NPC data');
            }
        });
    }
});
