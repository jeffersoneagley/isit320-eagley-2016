/* globals define: true, THREE:true */

define(['floor', 'pointerLockControls', 'pointerLockSetup', 'score'],
    function(Floors, PointerLockControls, PointerLockSetup, Score) {
        'use strict';
        var scene = null;
        var camera = null;
        var renderer = null;
        var cube = null;
        var THREE = null;
        var score = null;
        var crateMaterial = null;
        var loader = null;
        var size = 20;
        var cubes = [];
        var npcs = [];
        var controls;
        var raycaster;
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
            THREE = threeInit;
            console.log('Control constructor called');
            scene = new THREE.Scene();
            var width = window.innerWidth / window.innerHeight;
            camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);
            initializeMaterials();
            var floors = new Floors(THREE);
            score = new Score(THREE);
            floors.drawFloor(scene);
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            $('#gameWindow')
                .append(renderer.domElement);
            addCubes(scene, camera, false);
            addSpheres(scene, camera, false);
            addLights();

            raycaster = new THREE.Raycaster(new THREE.Vector3(),
                new THREE.Vector3(0, -1, 0), 0, 4);
            window.addEventListener('resize', onWindowResize, false);
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

            collisionDetection(cubes);
            collisionDetection(npcs);

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

        var collisionDetection = function(cubes) {

            function bounceBack(position, ray) {
                position.x -= ray.bounceDistance.x;
                position.y -= ray.bounceDistance.y;
                position.z -= ray.bounceDistance.z;
            }

            var rays = [
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

                if (intersections.length > 0 && intersections[0].distance <= 3) {
                    controls.isOnObject(true);
                    bounceBack(position, rays[index]);
                    if (intersections[0].object !== undefined &&
                        intersections[0].object.OnCollisionWithPlayer !== undefined) {
                        intersections[0].object.OnCollisionWithPlayer();
                    }
                }
            }

            return false;
        };

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
            $('#score')
                .html(Number(Math.round(score.GetScore())));
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

            $.getJSON('npcs000.json', function(grid) {
                for (var i = 0; i < grid.length; i++) {
                    for (var j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] !== 0) {
                            addSphere(scene, camera, false, (size * i), (size * j));
                        }
                    }
                }
            });
            readDatabase();
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

        function readDatabase() {
            $.getJSON('/readNpcInitialSetupParameters', function(data) {
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

        function addCube(scene, camera, wireFrame, x, y) {
            var geometry = new THREE.BoxGeometry(size, size, size);
            var cube = new THREE.Mesh(geometry, crateMaterial);
            cube.position.set(x, (size / 2) - 0.5, y);
            cubes.push(cube);
            scene.add(cube);

            return cube;
        }

        function addSphere(scene, camera, wireFrame, x, z) {
            var geometry = new THREE.SphereGeometry(3, 25, 25);
            var material = new THREE.MeshNormalMaterial({
                //  color: 0x05ff05,
                wireframe: wireFrame
            });
            var sphere = new THREE.Mesh(geometry, material);
            sphere.overdraw = true;
            sphere.position.set(x, size / 2, z);
            sphere.value = 1;
            sphere.collisionEnabled = true;
            sphere.OnCollisionWithPlayer = function() {
                if (score.GetScore() >= sphere.value - 1) {
                    console.log('encountered a sphere of value ' + sphere.value);
                    score.ScorePoints(sphere.value);
                    sphere.collisionEnabled = false;
                    refreshNpcList();
                }
            };

            npcs.push(sphere);
            scene.add(sphere);

            return sphere;
        }

        function refreshNpcList() {
            var temp = [];
            for (var i = 0; i < npcs.length; i++) {
                if (npcs[i].collisionEnabled === undefined ||
                    npcs[i].collisionEnabled === true) {
                    temp.push(npcs[i]);
                }
            }
            npcs = temp;
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
