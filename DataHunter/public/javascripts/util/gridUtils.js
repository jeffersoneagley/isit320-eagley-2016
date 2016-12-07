define([], function() {
    'use strict';
    var gridSize;

    function GridUtils(gridSizeInit) {
        gridSize = gridSizeInit;
    }

    GridUtils.prototype.doFunctionToGrid = function(grid, callback) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                callback(i, j);
            }
        }
    };

    GridUtils.prototype.convertGridToWorld = function(gridVal) {
        return gridSize * gridVal;
    };

    GridUtils.prototype.convertWorldToGrid = function(gridVal) {
        return gridVal / gridSize;
    };
    return GridUtils;
});
