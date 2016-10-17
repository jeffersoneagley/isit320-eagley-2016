/* globals define: true, THREE:true */

define(['floor', 'pointerLockControls', 'pointerLockSetup'],
    function(Floors, PointerLockControls, PointerLockSetup) {
        'use strict';
        var scene = null;
        var camera = null;
        var renderer = null;
        var cube = null;
        var THREE = null;
        var crateMaterial = null;
        var loader = null;
        var size = 20;
        var cubes = [];
        var controls;
        var raycaster;

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
            floors.drawFloor(scene);
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            $('#gameWindow')
                .append(renderer.domElement);
            addCubes(scene, camera, false);
            addSphere(scene, camera, false, 1, 1);
            addLights();

            raycaster = new THREE.Raycaster(new THREE.Vector3(),
                new THREE.Vector3(0, -1, 0), 0, 10);
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

            drawText(controlObject, position);

            collisionDetection(position);

            // Move the camera
            controls.update();

            renderer.render(scene, camera);
        }

        function collisionDetection(position) {
            // Collision detection
            raycaster.ray.origin.copy(position);

            var dir = controls.getDirection(new THREE.Vector3(0, 0, 0))
                .clone();
            raycaster.ray.direction.copy(dir);

            var intersections = raycaster.intersectObjects(cubes);

            // If we hit something (a wall) then stop moving in
            // that direction
            if (intersections.length > 0 && intersections[0].distance <= 215) {
                console.log(intersections.length);
                controls.isOnObject(true);
            }
        }

        function doPointerLock() {
            controls = new PointerLockControls(camera, THREE);
            var yawObject = controls.getObject();
            scene.add(yawObject);

            yawObject.position.x = size;
            yawObject.position.z = size;

            var ps = new PointerLockSetup(controls);
        }

        function drawText(object, position) {
            $('#cameraX')
                .html(position.x);
            $('#cameraZ')
                .html(position.z);
        }

        function addCubes(scene, camera, wireFrame) {
            for (var i = -3; i < 4; i++) {
                for (var j = -3; j < 4; j++) {
                    cube = addCube(scene, camera, false,
                        (2 * size) * i, (2 * size) * j);
                }
            }
        }

        function addCube(scene, camera, wireFrame, x, y) {
            var geometry = new THREE.BoxGeometry(size, size, size);
            var cube = new THREE.Mesh(geometry, crateMaterial);
            cube.position.set(x, 2, y);
            cubes.push(cube);
            scene.add(cube);

            return cube;
        }

        function addSphere(scene, camera, wireFrame, x, y) {
            var geometry = new THREE.SphereGeometry(0.5, 25, 25);
            var material = new THREE.MeshNormalMaterial({
                color: 0x05ff05,
                wireframe: wireFrame
            });
            var sphere = new THREE.Mesh(geometry, material);
            sphere.overdraw = true;
            sphere.position.set(x, 0, y);
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
