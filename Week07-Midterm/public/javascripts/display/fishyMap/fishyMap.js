define([require], function() {
    'use strict';
    var debug = true;

    function FishyMap() {
        this.mapItems = [];
        this.mapHtmlElements = [];
        this.mapHtmlTableRoot = $('<div>');
        this.mapHtmlTableRoot.css('display', 'flex');
        this.mapHtmlTableRoot.css('flex-direction', 'column-reverse');
        this.mapHtmlTableRoot.css('flex-wrap', 'no-wrap');
        this.mapHtmlTableRoot.css('width', '100%');
        this.mapHtmlTableRoot.css('height', '100%');
        this.mapHtmlTableRowElements = [];
        this.mapGrid = [];
        this.gridForStructures = null;
        this.gridForNpcs = null;
        this.ParentElement = $('#fishyMap');
    }

    FishyMap.prototype.DiscoverCell = function(x, y, isDiscovered) {
        isDiscovered = isDiscovered || true;
        console.log(x + ' ' + y + ' ' + isDiscovered);
        try {
            if (this.mapItems[x][y] !== undefined) {
                this.mapItems[x][y].discovered = isDiscovered;
                return true;
            }
            return false;
        } catch (exc) {
            return false;
        }
    };

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

    FishyMap.prototype.SetMinimapParentElement = function(parent) {
        //this.mapHtmlTableRoot.detatch();
        this.ParentElement = parent;
        this.ParentElement.append(this.mapHtmlTableRoot);
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
            var newRow = $('<div>');
            newRow.attr('id', 'fishyMapTableRow' + i);
            newRow.css('display', 'flex');
            newRow.css('width', '100%');
            newRow.css('flex-wrap', 'no-wrap');
            newRow.css('flex-grow', '1');
            newRow.css('height', '0.15em');
            newRow.css('min-width', '1%');
            newRow.css('min-height', '1%');
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
        var myCell = $('<div>');
        myCell.css('dislplay', 'inline-block');
        myCell.css('width', '0.15em');
        myCell.css('height', '100%');
        myCell.css('min-width', '1%');
        myCell.css('min-height', '1%');
        myCell.css('flex-grow', '1');

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
                    this.mapHtmlElements[i][j].css('background-color', 'lightskyblue');
                    //show structures
                    //show NPCS
                } else {
                    this.mapHtmlElements[i][j].css('background-color', 'slategray');
                }
            }
        }
    };
    return FishyMap;
});
