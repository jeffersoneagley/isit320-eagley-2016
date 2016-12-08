define(['popupQuestion', 'pointerLockControls', 'gridUtils', 'getPropertyArray'],
    function(PopupQuestion, PointerLockControls, GridUtils, getPropertyArray) {
        'use strict';

        var THREE = null;
        var npcList = [];
        var myPopupQuestion = null;
        var myScene = null;
        var scoreBoard = null;
        var gridUtils = null;
        var gridSize = null;
        var npcNode = null;

        var npcItems = [null];

        function NpcEngine(threeInit, scoreBoardInit, gridSizeInit) {
            gridSize = gridSizeInit;
            THREE = threeInit;
            scoreBoard = scoreBoardInit;
            gridUtils = new GridUtils(gridSize);
            makeNpcNode();
        }

        function makeNpcNode(scene) {
            if (scene) {
                scene.remove(npcNode);
            }
            npcNode = new THREE.Object3D();
            npcNode.name = '_npcs';
            if (scene) {
                scene.add(npcNode);
            }
        }

        // NpcEngine.prototype.addNpc = function(scene, camera, wireFrame, x, z, scale, color, npc_id) {
        //     myScene = scene;
        //     console.log(color + ' NPC added');
        //     var geometry = new THREE.SphereGeometry(scale / 4, 25, 25);
        //     var material = new THREE.MeshBasicMaterial({
        //         color: color,
        //         wireframe: wireFrame
        //     });
        //     var sphere = new THREE.Mesh(geometry, material);
        //     sphere.overdraw = true;
        //     sphere.position.set(x, scale / 2, z);
        //     sphere.npc_id = npc_id;
        //     sphere.npcAskQuestion = npcAskQuestion;
        //     sphere.npcCheckAnswer = npcCheckAnswer;
        //     var myNpc = sphere;
        //     sphere.OnCollisionEnter = function(self) {
        //         //console.log('OnCollisionEnter called');
        //         //console.log(self);
        //         myNpc.npcAskQuestion(myNpc);
        //     };
        //     scene.add(sphere);
        //     npcList.push(sphere);
        //     return sphere;
        // };

        // NpcEngine.prototype.getNpcList = function() {
        //     //console.log('getNpcList called ' + npcList);
        //     return npcList;
        // };

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
                    //myScene.remove(self);
                    self.scale.multiplyScalar(0.1);
                    self.OnCollisionEnter = undefined;
                    scoreBoard.QuestionsCorrect.ScorePoints(1);
                    scoreBoard.Reputation.ScorePoints(response.value);

                    self.questionAnswered = true;
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

        function readIntialNpcSetupFromDatabase(onComplete) {
            $.getJSON('/readNpcInitialSetupParameters', function(data) {
                    var myData = data.rows;
                    console.log('npcs from server ');
                    console.log(myData);
                    npcItems = [null];
                    for (var npc in myData) {
                        if (myData.hasOwnProperty(npc) && myData[npc]) {
                            var newNpc = myData[npc].value;
                            newNpc.createNpc = npcCreatorFunction;
                            npcItems.push(newNpc);
                        }
                    }
                })
                .fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log({
                        'Request Failed': err
                    });
                    var response = JSON.parse(jqxhr.responseText);
                    var responseValue = JSON.stringify(response, null, 4);
                    console.log(responseValue);
                    alert('Database not connected' + responseValue);
                    callback('Database not connected' + responseValue, null);
                })
                .done(onComplete);
        }

        function npcCreatorFunction(x, z, npcRef) {
            var geometry = new THREE.SphereGeometry(gridSize / 4, 25, 25);
            var material = new THREE.MeshBasicMaterial({
                'color': npcRef.color,
                'wireframe': false
            });
            //console.log(npcRef);
            var sphere = new THREE.Mesh(geometry, material);
            sphere.overdraw = true;
            console.log(gridSize);
            sphere.position.set(x, gridSize / 2, z);
            sphere.npc_id = npcRef.npc_id;
            sphere.npcAskQuestion = npcAskQuestion;
            sphere.npcCheckAnswer = npcCheckAnswer;
            sphere.color = npcRef.color;
            sphere.OnCollisionEnter = function() {
                sphere.npcAskQuestion(sphere);
            };
            npcNode.add(sphere);
            return sphere;
        }

        NpcEngine.prototype.createNpc = function(scene, worldx, worldy, npc_id) {
            if (npcItems[npc_id] !== null &&npcItems[npc_id] !== undefined) {
                console.log(npc_id);
                console.log(npcItems);
                console.log(npcItems[parseInt(npc_id)]);
                var newNpc = npcItems[npc_id]
                    .createNpc(worldx, worldy, npcItems[npc_id]);
                npcNode.add(newNpc);
            }
        };

        NpcEngine.prototype.getNpcColors = function() {
            var result = [];
            for (var npc in npcItems) {
                if (npcItems.hasOwnProperty(npc) &&
                npcItems[npc] !== null &&
                npcItems[npc].color !== undefined
              ) {
                    result.push(npcItems[npc].color);
                }else {
                    result.push('#eeeee');
                }
            }
            return result;
        };

        NpcEngine.prototype.reloadNpcs = function(scene, npcGrid, callback) {
            makeNpcNode(scene);
            readIntialNpcSetupFromDatabase(function() {
                gridUtils.doFunctionToGrid(npcGrid, function(gridx, gridy) {
                    NpcEngine.prototype.createNpc(
                      scene,
                      gridUtils.convertGridToWorld(gridx),
                      gridUtils.convertGridToWorld(gridy),
                      npcGrid[gridx][gridy]);
                });
                callback();
            });
        };

        NpcEngine.prototype.getCollisionItems = function() {
            var collisionNpcs = [];
            for (var npc in npcNode.children) {
                if (npcNode.children.hasOwnProperty(npc)) {
                    if (!npcNode.children[npc].questionAnswered) {
                        collisionNpcs.push(npcNode.children[npc]);
                    }
                }
            }
            return collisionNpcs;
        };
        // function refreshNpcList() {
        //     var temp = [];
        //     for (var i = 0; i < npcList.length; i++) {
        //         if (npcList[i].questionAnswered === undefined ||
        //             npcList[i].questionAnswered === false) {
        //             temp.push(npcList[i]);
        //         }
        //     }
        //     npcList = temp;
        // }

        return NpcEngine;

    });
