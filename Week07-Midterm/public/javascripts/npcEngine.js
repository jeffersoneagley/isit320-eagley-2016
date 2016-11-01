define(['popupQuestion', 'pointerLockControls'], function(PopupQuestion, PointerLockControls) {
    'use strict';

    var THREE = null;
    var npcList = [];
    var myPopupQuestion = null;
    var myScene = null;
    var scoreBoard = null;

    function NpcEngine(threeInit, scoreBoardInit) {
        THREE = threeInit;
        scoreBoard = scoreBoardInit;
    }

    NpcEngine.prototype.addNpc = function(scene, camera, wireFrame, x, z, scale, color, npc_id) {
        myScene = scene;
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
        var myNpc = sphere;
        sphere.OnCollisionEnter = function(self) {
            //console.log('OnCollisionEnter called');
            //console.log(self);
            myNpc.npcAskQuestion(myNpc);
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

        if (self.isAskingQuestion !== true) {
            //console.log('npcAskQuestion - ' + self.npc_id);
            //console.log('npc_id ' + self.npc_id + ' asking question from db');
            self.isAskingQuestion = true;
            $.getJSON('/readNpcQuestion?npc_id=' + self.npc_id, function(response) {
                //console.log('readNpcQuestion response recieved');
                console.log(JSON.stringify(response, null, 4));
                myPopupQuestion = new PopupQuestion(THREE);
                myPopupQuestion.ShowOptionsDialog(response.question, response.options, '/readNpcTryGuess', function(guess) {
                    npcCheckAnswer(self, guess);
                });
            });
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
            console.log(JSON.stringify(response, null, 4));
            scoreBoard.GuessesMade.ScorePoints(1);
            if (response.result) {
                //console.log('kill?');
                //console.log(myScene);
                myScene.remove(self);

                scoreBoard.QuestionsCorrect.ScorePoints(1);

                self.questionAnswered = true;
                refreshNpcList();
                self.isAskingQuestion = false;
            }
            myPopupQuestion.ShowOkDialog(
                response.result ? 'Success!' : 'Nope',
                response.result ? 'That was the right answer' : 'Try again~',
                function() {
                    self.isAskingQuestion = false;
                }
            );
        });
    }

    function refreshNpcList() {
        var temp = [];
        for (var i = 0; i < npcList.length; i++) {
            if (npcList[i].questionAnswered === undefined ||
                npcList[i].questionAnswered === false) {
                temp.push(npcList[i]);
            }
        }
        npcList = temp;
    }

    return NpcEngine;

});
