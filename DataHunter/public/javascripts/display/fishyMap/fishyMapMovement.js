define([], function() {
    'use strict';
    var lastLocation = {
        'x': 0,
        'z': 0
    };

    function FishyMapMovement() {

    }
    FishyMapMovement.prototype.CheckPlayerHasMovedCells = function(current, onCellEntered) {
        //console.log(current);
        if (
            current.x !== lastLocation.x ||
            current.z !== lastLocation.z
        ) {
            onCellEntered(current.x, current.z, true);
            //discover ahead of player
            var fwd = {
                x: (current.x - lastLocation.x),
                z: (current.z - lastLocation.z)
            };
            for (var i = -1; i <= 1; i++) {
                var myX = 0;
                if (fwd.x !== 0) {
                    onCellEntered(current.x + fwd.x, current.z + i, true);
                }
                if (fwd.z !== 0) {
                    onCellEntered(current.x + i, current.z + fwd.z, true);
                }
            }
            lastLocation.x = current.x;
            lastLocation.z = current.z;
        }
    };
    return FishyMapMovement;
});
