define([require], function() {
    'use strict';

    var THREE = null;

    function PrettyLights(THREE, scene) {
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.position.set(-1, -0.5, -1);
        scene.add(light);
    }

    return PrettyLights;
});
