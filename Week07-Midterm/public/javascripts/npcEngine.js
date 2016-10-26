define([require], function() {
    'use strict';

    var THREE = null;

    function NpcEngine(threeInit) {
        THREE = threeInit;
    }

    NpcEngine.prototype.addNpc = function(scene, camera, wireFrame, x, z, scale, color) {
        console.log(color + ' NPC added');
        var geometry = new THREE.SphereGeometry(3, 25, 25);
        var material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: wireFrame
        });
        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, scale / 2, z);
        scene.add(sphere);

        return sphere;
    };
    return NpcEngine;

});
