define(['popupQuestion', 'pointerLockControls'], function(PopupQuestion, PointerLockControls) {
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
            console.log('OnCollisionEnter called');
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

        if (self.isAskingQuestion === undefined || self.isAskingQuestion !== true) {
            console.log('npcAskQuestion - ' + self.npc_id);
            console.log('npc_id ' + self.npc_id + ' asking question from db');
            $.getJSON('/readNpcQuestion?npc_id=' + self.npc_id, function(response) {
                console.log('readNpcQuestion response recieved');
                console.log(JSON.stringify(response, null, 4));
                var myPopupQuestion = new PopupQuestion(THREE);
                myPopupQuestion.Show(response.question, response.options, '/readNpcTryGuess', function(guess) {
                    npcCheckAnswer(self, guess);
                });
            });
            if (self.isAskingQuestion === undefined) {
                self.isAskingQuestion = true;
            }
        }
    }

    function npcCheckAnswer(self, playerGuess) {
        //console.log(self + ', ' + playerGuess);
        console.log('npcCheckAnswer called');
        console.log(self.npc_id);
        $.getJSON('/readNpcTryGuess', {
            'npc_id': self.npc_id,
            'guess': playerGuess
        }, function(response) {
            console.log('readNpcTryGuess response recieved');
            console.log(JSON.stringify(response.result));
        });
        self.isAskingQuestion = false;
    }

    return NpcEngine;

});
