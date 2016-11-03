define([require], function() {
    'use strict';
    var debug = true;

    function FishyMap() {
        this.mapItems = [];
        this.mapHtmlElements = [];
        this.mapHtmlTableRoot = $('<table>');
        this.mapHtmlTableRowElements = [];
        this.mapGrid = [];
        this.gridForStructures = null;
        this.gridForNpcs = null;
        this.ParentElement = $('#fishyMap');
    }

    FishyMap.prototype.BindNpcMap = function(npcGrid) {
        this.gridForNpcs = npcGrid;
        if (this.gridForStructures !== null) {
            this.BuildMap();
        }
    };

    FishyMap.prototype.BindStructureMap = function(structureGrid) {
        this.gridForStructures = structureGrid;
        if (this.gridForNpcs !== null) {
            this.BuildMap();
        }
    };

    FishyMap.prototype.BuildMap = function() {
        if (debug) {
            console.log('BuildMap');
        }
        this.SetMinimapParentElement(this.ParentElement);
        for (var i = 0; i < this.gridForStructures.length; i++) {
            this.mapItems.push([]);
            for (var j = 0; j < this.gridForStructures[i].length; j++) {
                console.log('mapItems[' + i + '][' + j + ']');
                this.mapItems[i].push({
                    'structure': this.gridForStructures[i][j],
                    'npc': this.gridForNpcs[i][j],
                    'discovered': false
                });
            }
        }
        this.BuildAndFillHtmlGrid();
    };

    FishyMap.prototype.BuildAndFillHtmlGrid = function() {
        if (debug) {
            console.log('BuildAndFillHtmlGrid');
        }
        this.mapHtmlTableRoot.empty();
        for (var i = 0; i < this.mapItems.length; i++) {
            var newRow = $('<tr>');
            newRow.attr('id', 'fishyMapTableRow' + i);
            this.mapHtmlTableRoot.append(newRow);
            this.mapHtmlTableRowElements.push(newRow);
            this.mapHtmlElements.push([]);
            for (var j = 0; j < this.mapItems[i].length; j++) {
                var newCell = this.BuildHtmlMapCell();
                newCell.attr('id', 'fishyMapTableCell' + i + 'by' + j);
                newCell.appendTo(newRow);
                console.log(newCell);
                this.mapHtmlElements[i].push(newCell);
            }
        }
    };

    FishyMap.prototype.BuildHtmlMapCell = function() {
        if (debug) {
            console.log('BuildHtmlMapCell');
        }
        var myCell = $('<td>');
        myCell.css('width:0.1em; height:0.1em');
        return myCell;
    };

    FishyMap.prototype.Refresh = function() {
        for (var i = 0; i < this.mapItems.length; i++) {
            for (var j = 0; j < this.mapItems.length; j++) {
                //safety check
                //if (this.mapHtmlElements[i][j] === undefined) {
                //this.mapHtmlElements.push(this.BuildHtmlMapCell());
                //}
                //drawing
                if (this.mapItems[i][j].discovered) {
                    //set background
                    this.mapHtmlElements[i][j].css('background-color:RGBA(10,10,10,0.10)');
                    //show structures
                    //show NPCS
                } else {
                    this.mapHtmlElements[i][j].css('background-color:slategray');
                }
            }
        }
    };

    FishyMap.prototype.SetMinimapParentElement = function(parent) {
        //this.mapHtmlTableRoot.detatch();
        this.ParentElement = parent;
        this.ParentElement.append(this.mapHtmlTableRoot);
    };
    return FishyMap;
});
