define(['./fishyMapMovement'], function(FishyMapMovement) {
    'use strict';
    var mapGrid = [];
    var mapItems = [];
    var mapHtmlElements = [];
    var mapHtmlTableRowElements = [];
    var gridUtils = null;
    var debug = false;
    var fishyMapMovement = null;
    var gridForStructures = null;
    var gridForNpcs = null;
    var templateListStructures = null; //stores images based on index
    var templateListNpcs = null; //stores colors based on index
    var mapHtmlTableRoot = $('<div>');
    var ParentElement = $('#fishyMap');
    var THREE = null;

    function FishyMap(threeInit, gridUtilsInit) {
        THREE = threeInit;
        gridUtils = gridUtilsInit;
        initializeHtmlTable();
        fishyMapMovement = new FishyMapMovement();
        FishyMap.prototype.CheckBindComplete();
    }

    function initializeHtmlTable() {
        mapHtmlTableRoot.css('display', 'flex');
        mapHtmlTableRoot.css('flex-direction', 'column-reverse');
        mapHtmlTableRoot.css('flex-wrap', 'no-wrap');
        mapHtmlTableRoot.css('width', '100%');
        mapHtmlTableRoot.css('height', '100%');
    }

    FishyMap.prototype.animateReducedUpdate = function(playerObject) {
        fishyMapMovement.CheckPlayerHasMovedCells({
            'x': gridUtils.convertWorldToGrid(playerObject.position.x),
            'z': gridUtils.convertWorldToGrid(playerObject.position.z)
        },
          FishyMap.prototype.DiscoverCell
        );
    };

    FishyMap.prototype.DiscoverCell = function(cellx, celly, isDiscovered) {
        isDiscovered = isDiscovered || true;
        try {
            //console.log(x + ' ' + y + ' ' + isDiscovered);
            if (mapItems[cellx][celly] !== undefined) {
                mapItems[cellx][celly].discovered = isDiscovered;
                FishyMap.prototype.refreshCellHtml(cellx, celly);
                return true;
            }
        } catch (exc) {
            console.log(exc);
        }
        FishyMap.prototype.refreshCellHtml(cellx, celly);
        return false;
    };

    FishyMap.prototype.BindKeyNpcColors = function(arrayOfNpcs) {
        templateListNpcs = arrayOfNpcs;
        FishyMap.prototype.CheckBindComplete();
    };

    FishyMap.prototype.BindKeyStructureBackgrounds = function(arrayOfStructures) {
        templateListStructures = arrayOfStructures;
        FishyMap.prototype.CheckBindComplete();
    };

    FishyMap.prototype.BindNpcMap = function(npcGrid) {
        gridForNpcs = npcGrid;
        FishyMap.prototype.CheckBindComplete();
    };

    FishyMap.prototype.BindStructureMap = function(structureGrid) {
        gridForStructures = structureGrid;
        console.log(structureGrid);
        FishyMap.prototype.CheckBindComplete();
    };

    FishyMap.prototype.CheckBindComplete = function() {
        if (
            gridForNpcs !== null &&
            gridForStructures !== null &&
            templateListNpcs !== null &&
            templateListStructures !== null
        ) {
            FishyMap.prototype.BuildMap();
            for (var i = 0; i < mapItems.length; i++) {
                for (var j = 0; j < mapItems.length; j++) {
                    FishyMap.prototype.refreshCellHtml(i, j);
                }
            }
            // fishyMapMovement.CheckPlayerHasMovedCells({
            //     'x': gridUtils.convertWorldToGrid(playerObject.position.x),
            //     'z': gridUtils.convertWorldToGrid(playerObject.position.z)
            // },
            //   FishyMap.prototype.DiscoverCell
            // );
        }
    };

    FishyMap.prototype.SetMinimapParentElement = function(parent) {
        //mapHtmlTableRoot.detatch();
        ParentElement = parent;
        ParentElement.append(mapHtmlTableRoot);
    };

    FishyMap.prototype.BuildMap = function() {
        if (debug) {
            console.log('BuildMap');
        }
        FishyMap.prototype.SetMinimapParentElement(ParentElement);
        for (var i = 0; i < gridForStructures.length; i++) {
            mapItems.push([]);
            for (var j = 0; j < gridForStructures[i].length; j++) {
                //console.log('mapItems[' + i + '][' + j + ']');
                mapItems[i].push({
                    'structure': gridForStructures[i][j],
                    'npc': gridForNpcs[i][j],
                    'discovered': false
                });
            }
        }
        FishyMap.prototype.BuildAndFillHtmlGrid();
    };

    FishyMap.prototype.DoForAllMapItems = function(cellFunction) {
        for (var i = 0; i < mapItems.length; i++) {
            for (var j = 0; j < mapItems.length; j++) {
                cellFunction(mapItems[i][j]);
            }
        }
    };

    FishyMap.prototype.GetExplorableSquares = function() {
        var explorableSquares = 0;
        DoForAllMapItems(function(mapItem) {
            if (mapItem.structure === 0) {
                explorableSquares++;
            }
        });
    };

    FishyMap.prototype.GetExploredSquares = function() {
        var exploredSquares = 0;
        DoForAllMapItems(function(mapItem) {
            if (mapItem.structure === 0) {
                if (
                    mapItems.structure === 0 &&
                    mapItems.discovered
                ) {
                    exploredSquares++;
                }
            }
        });

    };

    FishyMap.prototype.BuildAndFillHtmlGrid = function() {
        if (debug) {
            console.log('BuildAndFillHtmlGrid');
        }
        mapHtmlTableRoot.empty();
        for (var i = 0; i < mapItems.length; i++) {
            var newRow = $('<div>');
            newRow.attr('id', 'fishyMapTableRow' + i);
            newRow.css('display', 'flex');
            newRow.css('width', '100%');
            newRow.css('flex-wrap', 'no-wrap');
            newRow.css('flex-grow', '1');
            newRow.css('height', '0.15em');
            newRow.css('min-width', '1%');
            newRow.css('min-height', '1%');
            mapHtmlTableRoot.append(newRow);
            mapHtmlTableRowElements.push(newRow);
            mapHtmlElements.push([]);
            for (var j = 0; j < mapItems[i].length; j++) {
                var newCell = FishyMap.prototype.BuildHtmlMapCell();
                newCell.attr('id', 'fishyMapTableCell' + i + 'by' + j);
                newCell.appendTo(newRow);
                //console.log(newCell);
                mapHtmlElements[i].push(newCell);
            }
        }
    };

    FishyMap.prototype.BuildHtmlMapCell = function() {
        if (debug) {
            console.log('BuildHtmlMapCell');
        }
        var myCell = $('<div>');
        myCell.css('dislplay', 'inline-block');
        myCell.css('width', '0.15em');
        myCell.css('height', '100%');
        myCell.css('min-width', '1%');
        myCell.css('min-height', '1%');
        myCell.css('flex-grow', '1');

        return myCell;
    };

    FishyMap.prototype.refreshCellHtml = function(i, j) {
        //console.log('refreshCellHtml');
        if (
          mapItems[i][j].discovered
        ) {

            mapHtmlElements[i][j].empty();
            //set background
            mapHtmlElements[i][j].css('background-color', 'lightskyblue');
            //show structures
            try {
                var structureId = mapItems[i][j].structure;
                if (structureId !== 0) {
                    // var myStructure = $(templateListStructures[structureId].map.image).cloneNode(false);
                    // console.log(myStructure);
                    // myStructure
                    //     .attr('display', 'block')
                    //     .css('width', '90%')
                    //     .css('height', '90%');
                    // console.log(structureId);
                    // console.log(templateListStructures[structureId]);
                    var myStructure = $('<div>')
                        .css('display', 'block')
                        .css('width', '90%')
                        .css('height', '90%')
                        .css('background-color', 'sandybrown')
                        .css('background-size', '99%');
                    // .css('background-image', $(templateListStructures[structureId].map.image));
                    // .css('background', 'URL(' + 'images/crate.jpg' + ')')

                    mapHtmlElements[i][j].append(myStructure);
                }
            } catch (exc) {
                console.log(exc);
                console.log('Error loading structure for cell');
            }
            //show NPCS
            try {
                var npcId = mapItems[i][j].npc;
                if (npcId !== 0) {
                    var myNpc = templateListNpcs[npcId];
                    // var myColor = myNpc.color;
                    var myColor = myNpc;
                    var npcEmblem = $('<div>')
                        .css('width', '50%')
                        .css('height', '50%')
                        .css('border-radius', '25%')
                        .css('border', 'groove 0.1em ' + myColor)
                        .css('background', myColor);
                    mapHtmlElements[i][j].append(npcEmblem);
                }
            } catch (exc) {
                console.log(exc);
                console.log('NPC add to map failed');
            }
        } else {
            mapHtmlElements[i][j].css('background-color', 'slategray');
        }
    };
    return FishyMap;
});
