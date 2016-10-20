define([require], function() {

    'use strict';

    var THREE = null;

    function Floors(threeInit) {
        THREE = threeInit;
    }

    function makeFloor() {
        // floor

        var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        geometry.applyMatrix(new THREE.Matrix4()
            .makeRotationX(-Math.PI / 2));

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {

            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

        }

        for (i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color()
                .setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color()
                .setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color()
                .setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        }

        var material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors
        });

        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    Floors.prototype.drawFloor = function(scene) {
        // FLOOR
        var names = ['images/checkerboard.jpg',
            'images/FloorBorder256.png',
            'images/WoodenPlanks.png',
            'images/grass02.jpg',
            'images/Grass03.png'
        ];
        var repeats = [250, 100, 100, 175];
        var index = 0;
        //var floorTexture = new THREE.ImageUtils.loadTexture('images/FloorBorder256.png');
        var floorTexture = new THREE.ImageUtils.loadTexture(names[index]);
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(repeats[index], repeats[index]);
        var floorMaterial = new THREE.MeshBasicMaterial({
            map: floorTexture,
            side: THREE.DoubleSide
        });
        var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 10, 10);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;
        scene.add(floor);
    };

    return Floors;
});
