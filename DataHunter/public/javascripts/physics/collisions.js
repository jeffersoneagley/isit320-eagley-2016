define([require], function() {
    'use strict';

    var THREE = null;
    var raycaster;
    var rays;
    var debug = false;

    function Collisions(threeInit) {
        THREE = threeInit;
        raycaster = new THREE.Raycaster(new THREE.Vector3(),
            new THREE.Vector3(0, -1, 0), 0, 4);
        rays = [
            //   Time    Degrees      words
            new THREE.Vector3(0, 0, 1), // 0 12:00,   0 degrees,  deep
            new THREE.Vector3(1, 0, 1), // 1  1:30,  45 degrees,  right deep
            new THREE.Vector3(1, 0, 0), // 2  3:00,  90 degress,  right
            new THREE.Vector3(1, 0, -1), // 3  4:30, 135 degrees,  right near
            new THREE.Vector3(0, 0, -1), // 4  6:00  180 degress,  near
            new THREE.Vector3(-1, 0, -1), // 5  7:30  225 degrees,  left near
            new THREE.Vector3(-1, 0, 0), // 6  9:00  270 degrees,  left
            new THREE.Vector3(-1, 0, 1), // 7 11:30  315 degrees,  left deep
            //new THREE.Vector3(0, -1, 0), // 8 down straight
            new THREE.Vector3(0.5, -1, 0.33), //9 down right ////////////charlie, look at this
            new THREE.Vector3(-0.5, -1, 0.33), //10 down left
            new THREE.Vector3(0, -1, -0.66) //11 down rear
        ];
        //I built a tripod to ensure that players couldn't "fall" at a 45 through boxes
    }

    function bounceBack(position, ray) {
        position.x -= ray.bounceDistance.x;
        position.y -= ray.bounceDistance.y;
        position.z -= ray.bounceDistance.z;
    }

    Collisions.prototype.detect = function(cubes, controls) {
        var result = false;
        var position = controls.getObject()
            .position;
        var rayHits = [];
        for (var index = 0; index < rays.length; index += 1) {

            // Set bounce distance for each vector
            var bounceSize = 0.01;
            rays[index].bounceDistance = {
                x: rays[index].x * bounceSize,
                y: rays[index].y * bounceSize,
                z: rays[index].z * bounceSize
            };

            raycaster.set(position, rays[index]);

            var intersections = raycaster.intersectObjects(cubes);

            for (var i = 0; i < intersections.length; i++) {
                if (intersections.length > 0 &&
                    intersections[i].distance <= 3 &&
                    intersections[i].object.visible !== undefined &&
                    intersections[i].object.visible === true
                ) {
                    controls.isOnObject(true);
                    bounceBack(position, rays[index]);
                    result = true;
                }
                if (intersections[i].object !== undefined &&
                    intersections[i].object.OnCollisionEnter !== undefined) {
                    if (debug) {
                        console.log(intersections[i].object + ' executing OnCollisionEnter');
                    }

                    intersections[i].object.OnCollisionEnter(intersections[i].object);
                }
            }
        }

        return result;
    };

    function intersectNpc(npc_id) {
        if (debug) {
            console.log(npc_id + ' encountered');
        }
    }

    return Collisions;
});
