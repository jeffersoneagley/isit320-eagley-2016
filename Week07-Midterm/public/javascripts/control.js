/* globals define: true, THREE:true */

define(['floor', 'score', 'pointerLockControls', 'pointerLockSetup', 'collisions', 'npcEngine', 'prettyLights', 'drawHud'],
    function(Floors, Score, PointerLockControls, PointerLockSetup, Collisions, NpcEngine, PrettyLights, DrawHud) {
        'use strict';
        var scene = null;
        var camera = null;
        var renderer = null;
        var cube = null;
        var THREE = null;
        var scoreboard = {};
        var floors;
        var collisions = null;
        var npcEngine = null;
        var drawHud = null;
        var crateMaterial = null;
        var loader = null;
        var size = 20;
        var cubes = [];
        var controls;
        var reducedUpdateIndex = 0;

        var cameraPosition = {
            x: 2,
            y: 0,
            z: 2
        };
        var onWindowResize = function(event) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        function Control(threeInit) {
            init(threeInit);
            animate();
        }

        function init(threeInit) {
            console.log('Control constructor called');
            //start three
            THREE = threeInit;

            //initialize controllers and objects
            scene = new THREE.Scene();
            initializeMaterials();
            floors = new Floors(THREE);
            collisions = new Collisions(THREE);
            drawHud = new DrawHud(THREE);
            initializeScoreboard();
            //set up scene
            floors.drawFloor(scene);
            npcEngine = new NpcEngine(THREE, scoreboard);
            initializeHudBindings();

            //set up camera
            var width = window.innerWidth / window.innerHeight;
            camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

            //attach game
            $('#gameWindow')
                .append(renderer.domElement);

            //build items to scene
            addCubes(scene, camera, false);
            addSpheres(scene, camera, false);
            new PrettyLights(THREE, scene);

            window.addEventListener('resize', onWindowResize, false);

            //final scale and lock
            onWindowResize();
            doPointerLock();
        }

        function initializeMaterials() {
            var loader = new THREE.TextureLoader();
            crateMaterial = new THREE.MeshLambertMaterial({
                map: loader.load('images/crate.jpg')
            });
        }

        function initializeHudBindings() {
            drawHud.AttachRefreshFunction(scoreboard.GuessesMade, 'GetScoreText');
            drawHud.AttachRefreshFunction(scoreboard.QuestionsCorrect, 'GetScoreText');
            drawHud.AttachRefreshFunction(scoreboard.Reputation, 'GetScoreText');

        }

        function initializeScoreboard() {
            scoreboard.GuessesMade = new Score(THREE, 'Guesses made: ');
            scoreboard.QuestionsCorrect = new Score(THREE, 'Questions correct: ');
            scoreboard.Reputation = new Score(THREE, 'Reputation: ');
        }

        function animate() {

            requestAnimationFrame(animate);

            var xAxis = new THREE.Vector3(1, 0, 0);

            controls.isOnObject(false);

            var controlObject = controls.getObject();
            var position = controlObject.position;
            collisions.detect(cubes, controls);
            collisions.detect(npcEngine.getNpcList(), controls);

            // Move the camera
            controls.update();

            if (reducedUpdateIndex > 15) {
                reducedUpdateIndex = 0;
                animateReducedUpdate();
            } else {
                reducedUpdateIndex++;
            }

            renderer.render(scene, camera);
        }

        function animateReducedUpdate() {
            drawHud.RefreshHud();
            drawText(controls.getObject()
                .position);
            //console.log(scoreboard.QuestionsCorrect.GetScoreText());
            //console.log(scoreboard.GuessesMade.GetScoreText());
        }

        function doPointerLock() {
            controls = new PointerLockControls(camera, THREE);
            var yawObject = controls.getObject();
            scene.add(yawObject);

            yawObject.position.x = size;
            yawObject.position.z = size;

            var ps = new PointerLockSetup(controls);
        }

        function drawText(position) {
            $('#cameraX')
                .html(Number(Math.round(position.x / size)));
            $('#cameraZ')
                .html(Number(Math.round(position.z / size)));
        }

        function addCubes(scene, camera, wireFrame) {

            $.getJSON('grid000.json', function(grid) {
                for (var i = 0; i < grid.length; i++) {
                    for (var j = 0; j < grid[i].length; j++) {
                        switch (grid[i][j]) {
                            case 1:

                                addCube(scene, camera, false, (size * i), (size * j));
                                break;
                            default:

                        }
                    }
                }
            });
        }

        function addSpheres(scene, camera, wireFrame) {

            var data = readDatabase(function(err, data) {
                if (!err) {
                    $.getJSON('npcs000.json', function(grid) {
                        for (var i = 0; i < grid.length; i++) {
                            for (var j = 0; j < grid[i].length; j++) {
                                if (grid[i][j] !== 0) {
                                    npcEngine.addNpc(scene, camera, false,
                                        (size * i), (size * j), size,
                                        data[grid[i][j] - 1].value.color,
                                        data[grid[i][j] - 1].value.npc_id
                                    );
                                }
                            }
                        }
                    });
                } else {
                    console.log('Failed to load NPC data');
                }
            });
        }

        function readDatabase(callback) {
            $.getJSON('/readNpcInitialSetupParameters', function(data) {
                    var myData = data.rows;
                    console.log(myData);
                    console.log(JSON.stringify(myData, null, 4));
                    callback(undefined, myData);
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
                });
        }

        function addCube(scene, camera, wireFrame, x, y) {
            var geometry = new THREE.BoxGeometry(size, size, size);
            var cube = new THREE.Mesh(geometry, crateMaterial);
            cube.position.set(x, (size / 2) - 0.5, y);
            cubes.push(cube);
            scene.add(cube);

            return cube;
        }

        return Control;
    });
