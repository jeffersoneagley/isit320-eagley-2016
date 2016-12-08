define(['prettyLights', './structureManager', 'fishyMap', 'gridUtils'],
    function(PrettyLights, StructureManager, FishyMap, GridUtils) {
        'use strict';
        var currentLevelObject = null;
        var currentLevelNumber = 1;
        var THREE = null;
        var npcEngine = null;
        var structureManager = null;
        var gridSize = null;
        var fishyMap = null;
        var scene = null;
        var gridUtils = null;

        function LevelManager(threeInit, npcEngineInit, gridSizeInit, sceneInit) {
            THREE = threeInit;
            scene = sceneInit;
            gridSize = gridSizeInit;
            gridUtils = new GridUtils(gridSize);

            structureManager = new StructureManager(THREE, gridSize);
            npcEngine = npcEngineInit;

            fishyMap = new FishyMap(THREE, gridUtils);

            getLevel(currentLevelNumber);
        }

        function getLevel() {
            $.getJSON('/level/load/' + currentLevelNumber, function(responseData, err) {
                console.log(responseData);
                console.log(err);
                console.log('level recieved');
                currentLevelObject = responseData;
                //initialize structure materials and feed them to the minimap
                var mats = structureManager.initializeMaterials();
                fishyMap.BindKeyStructureBackgrounds(mats);
                buildLevel();
                fishyMap.BindStructureMap(currentLevelObject.structure);
                fishyMap.BindNpcMap(currentLevelObject.npc);
            });
        }

        function buildLevel() {
            console.log('building level');
            structureManager.reloadStructures(scene, currentLevelObject.structure);
            npcEngine.reloadNpcs(scene, currentLevelObject.npc, function() {
                var npcColors = npcEngine.getNpcColors();
                fishyMap.BindKeyNpcColors(npcColors);
            });
        }

        LevelManager.prototype.animateReducedUpdate = function(playerObject) {
            fishyMap.animateReducedUpdate(playerObject);
        };

        LevelManager.prototype.StructureManager = function() {
            return structureManager;
        };

        LevelManager.prototype.getCollisionItems = function() {
            return structureManager.getCollisionItems();
        };

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
        return LevelManager;
    });
