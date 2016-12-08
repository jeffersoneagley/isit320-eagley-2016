define(['gridUtils', 'getPropertyArray'],
function(GridUtils, getPropertyArray) {
    'use strict';

    var THREE = null;
    var gridSize = null;
    var gridUtils = null;

    var structureItems = [
        null, {
            'name': 'crate',
            'materialPath': 'images/crate.jpg',
            'buildStructure': function(x, y) {
                var geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
                var cube = new THREE.Mesh(geometry, structureItems[1].material);
                cube.position.set(x, (gridSize / 2) - 0.5, y);
                structureNode.add(cube);
                return cube;
            }
        }
    ];
    var loader = null;
    var structureNode = null;

    function StructureManager(threeInit, gridSizeInit) {
        THREE = threeInit;
        gridSize = gridSizeInit;
        gridUtils = new GridUtils(gridSizeInit);
        makeStructureNode();
    }

    function makeStructureNode(scene) {
        if (scene) {
            scene.remove(structureNode);
        }
        structureNode = new THREE.Object3D();
        structureNode.name = '_structures';
        if (scene) {
            scene.add(structureNode);
        }
    }

    StructureManager.prototype.initializeMaterials = function() {
        var loader = new THREE.TextureLoader();
        for (var structureObj in structureItems) {
            if (
                structureItems.hasOwnProperty(structureObj) &&
                structureItems[structureObj] &&
                structureItems[structureObj].name &&
                structureItems[structureObj].materialPath
            ) {
                structureItems[structureObj].material = new THREE.MeshLambertMaterial({
                    map: loader.load(
                        structureItems[structureObj].materialPath
                    )
                });
            }
        }
        return getPropertyArray(structureItems, 'material');
    };

    StructureManager.prototype.buildStructure = function(scene, worldx, worldy, structureId) {
        if (structureItems[structureId]) {
            var newStructure = structureItems[structureId]
                .buildStructure(worldx, worldy);
            structureNode.add(newStructure);
        }
    };

    StructureManager.prototype.reloadStructures = function(scene, structureGrid) {
        makeStructureNode(scene);
        gridUtils.doFunctionToGrid(structureGrid, function(gridx, gridy) {
            StructureManager.prototype.buildStructure(
                scene,
                gridUtils.convertGridToWorld(gridx),
                gridUtils.convertGridToWorld(gridy),
                structureGrid[gridx][gridy]);
        });
    };

    StructureManager.prototype.getCollisionItems = function() {
        return structureNode.children;
    };

    return StructureManager;
});
