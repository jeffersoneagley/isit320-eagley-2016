define([require], function() {
    'use strict';

    var THREE = null;
    var npcList = [];

    function NpcEngine(threeInit) {
        THREE = threeInit;
    }

    NpcEngine.prototype.addNpc = function(scene, camera, wireFrame, x, z, scale, color, npc_id) {
        console.log(color + ' NPC added');
        var geometry = new THREE.SphereGeometry(scale / 4, 25, 25);
        var material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: wireFrame
        });
        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, scale / 2, z);
        sphere.npc_id = npc_id;
        scene.add(sphere);
        npcList.push(sphere);
        return sphere;
    };

    NpcEngine.prototype.getNpcList = function() {
        //console.log('getNpcList called ' + npcList);
        return npcList;
    };

    return NpcEngine;

});
