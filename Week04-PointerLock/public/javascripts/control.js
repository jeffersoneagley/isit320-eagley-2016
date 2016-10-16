/* globals define: true, THREE:true */

define(['floors'], function(Floors) {
    'use strict';
    var scene = null;
    var camera = null;
    var renderer = null;
    var cube = null;
    var THREE = null;
    var crateMaterial = null;
    var loader = null;

    var keyMove = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    };

    var cameraPosition = {
        x: 2,
        y: 0,
        z: 2
    };

    var movementKeyHandler = function(event, down) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = down;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = down;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = down;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = down;
                break;
        }
    };

    var onKeyDown = function(event) {
        movementKeyHandler(event, true);
    };

    var onKeyUp = function(event) {
        movementKeyHandler(event, false);
    };

    var onWindowResize = function(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    function Control(threeInit) {
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
        //cube = addCube(scene, camera, false, 1, 1);
        addSphere(scene, camera, false, 1, 1);
        var sceneLighting = addLights();
        camera.position.z = 23;
        camera.position.x = 2;
        camera.position.y = 0;
        window.addEventListener('resize', onWindowResize, false);
        onWindowResize();
        render();
    }

    function initializeMaterials() {
        var loader = new THREE.TextureLoader();
        crateMaterial = new THREE.MeshLambertMaterial({
            map: loader.load('images/crate.jpg')
        });
    }

    function render() {
        requestAnimationFrame(render);
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        if (keyMove.moveLeft) {
            cameraPosition.x -= 1;
        }
        if (keyMove.moveRight) {
            cameraPosition.x += 1;
        }

        if (keyMove.moveForward) {
            cameraPosition.z -= 1;
        }
        if (keyMove.moveBackward) {
            cameraPosition.z += 1;
        }
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        //  cube.rotation.x += 0.01;
        //  cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    function addCubes(scene, camera, wireFrame) {
        for (var i = -3; i < 4; i++) {
            for (var j = -3; j < 4; j++) {
                cube = addCube(scene, camera, false, 10 * i, 10 * j);
            }
        }
    }

    function addCube(scene, camera, wireFrame, x, y) {
        var geometry = new THREE.BoxGeometry(5, 5, 5);
        var cube = new THREE.Mesh(geometry, crateMaterial);
        cube.position.set(x, 2, y);
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
