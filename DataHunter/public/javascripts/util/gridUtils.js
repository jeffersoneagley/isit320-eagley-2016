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

    function convertParser(gridVal, endcase) {
        if (typeof gridVal === 'number') {
            return endcase(gridVal);
        }else {
            var response = {};
            for (var variable in gridVal) {
                if (gridVal.hasOwnProperty(variable)) {
                    var recurseResult = convertParser(gridVal[variable], endcase);
                    if (recurseResult !== null && recurseResult !== undefined) {
                        response[variable] = recurseResult;
                    }
                }
            }
            console.log(response);
            return response;
        }
    }

    GridUtils.prototype.convertGridToWorld = function(gridVal) {
        return convertParser(gridVal, function(result) {
            return gridSize * result;
        });
    };

    GridUtils.prototype.convertWorldToGrid = function(gridVal) {
        return convertParser(gridVal, function(result) {
            return Number(Math.round(result / gridSize));
        });
    };
    return GridUtils;
});
