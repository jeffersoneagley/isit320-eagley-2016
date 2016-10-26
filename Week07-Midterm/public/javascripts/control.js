/* globals define: true, THREE:true */

define(['floor', 'pointerLockControls', 'pointerLockSetup', 'collisions', 'npcEngine'],
    function(Floors, PointerLockControls, PointerLockSetup, Collisions, NpcEngine) {
        'use strict';
        var scene = null;
        var camera = null;
        var renderer = null;
        var cube = null;
        var THREE = null;
        var floors;
        var collisions = null;
        var npcEngine = null;
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
            initializeMaterials();
            floors = new Floors(THREE);
            collisions = new Collisions(THREE);
            scene = new THREE.Scene();
            npcEngine = new NpcEngine(THREE);

            //set up camera
            var width = window.innerWidth / window.innerHeight;
            camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

            //set up scene
            floors.drawFloor(scene);

            //attach game
            $('#gameWindow')
                .append(renderer.domElement);

            //build items to scene
            addCubes(scene, camera, false);
            addSpheres(scene, camera, false);
            addLights();

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

        function animate() {

            requestAnimationFrame(animate);

            var xAxis = new THREE.Vector3(1, 0, 0);

            controls.isOnObject(false);

            var controlObject = controls.getObject();
            var position = controlObject.position;
            collisions.detect(cubes, controls);

            // Move the camera
            controls.update();

            if (reducedUpdateIndex > 7) {
                reducedUpdateIndex = 0;
                animateReducedUpdate();
            } else {
                reducedUpdateIndex++;
            }

            renderer.render(scene, camera);
        }

        function animateReducedUpdate() {

            drawText(controls.getObject()
                .position);
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
                                        data[grid[i][j] - 1].value.color);
                                }
                            }
                        }
                    });
                } else {
                    console.log('Failed to load NPC data');
                }
            });
        }

        function checkPlayerPositionForNPC() {
            var x = 1;
            var z = 1;
            $.getJSON('/checkPlayerPositionForNPC?={x:' + x + ',z:' + z + '}', function(data) {
                    console.log(JSON.stringify(data, null, 4));
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

        function addSphere(scene, camera, wireFrame, x, z, color) {
            console.log(color + ' NPC added');
            var geometry = new THREE.SphereGeometry(3, 25, 25);
            var material = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: wireFrame
            });
            var sphere = new THREE.Mesh(geometry, material);
            sphere.overdraw = true;
            sphere.position.set(x, size / 2, z);
            scene.add(sphere);

            return sphere;
        }

        function addLights() {
            var light = new THREE.DirectionalLight(0xffffff, 1.5);
            light.position.set(1, 1, 1);
            scene.add(light);
            light = new THREE.DirectionalLight(0xffffff, 0.75);
            light.position.set(-1, -0.5, -1);
            scene.add(light);
        }

        return Control;
    });
