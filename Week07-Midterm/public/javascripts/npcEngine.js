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
        sphere.npcAskQuestion = npcAskQuestion;
        sphere.npcCheckAnswer = npcCheckAnswer;
        sphere.OnCollisionEnter = function(self) {
            if (self.npcAskQuestion !== undefined) {
                self.npcAskQuestion(self);
            }
        };
        scene.add(sphere);
        npcList.push(sphere);
        return sphere;
    };

    NpcEngine.prototype.getNpcList = function() {
        //console.log('getNpcList called ' + npcList);
        return npcList;
    };

    function npcAskQuestion(self) {
        //get npc's question
        if (self.isAskingQuestion === undefined) {
            self.isAskingQuestion = true;
        }
        if (self.isAskingQuestion !== true) {
            console.log(self.npc_id);
            $.getJSON('/readNpcQuestion?=npc_id:' + self.npc_id, function(data) {
                var myData = data.rows;
                console.log(JSON.stringify(myData, null, 4));
            });
        }
    }

    function npcCheckAnswer(self, playerGuess) {
        self.isAskingQuestion = false;
        $.getJSON('/readNpcTryGuess?=npc_id:' + self.npc_id + '&&guess:' + playerGuess, function(result) {
            var myData = data.rows;
            console.log(result);
        });
    }

    return NpcEngine;

});
