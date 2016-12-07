requirejs.config({
    baseUrl: '/',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'Three': 'javascripts/three.min',
        'pointerLockControls': 'javascripts/pointerlock/pointerLockControls',
        'pointerLockSetup': 'javascripts/pointerlock/pointerLockSetup',
        'popupQuestion': 'javascripts/display/popupQuestion',
        'score': 'javascripts/score',
        'control': 'javascripts/control',
        'floor': 'javascripts/physics/level/floors',
        'prettyLights': 'javascripts/physics/level/prettyLights',
        'collisions': 'javascripts/physics/collisions',
        'npcEngine': 'javascripts/npc/npcEngine',
        'drawHud': 'javascripts/display/drawHud',
        'fishyMap': 'javascripts/display/fishyMap/fishyMap',
        'gridUtils': 'javascripts/util/gridUtils'
    },
    packages: [{
        name: 'levelManager',
        location: '/javascripts/levelManager',
        main: 'levelManager'
    }],
    shim: {
        'Three': {
            exports: 'THREE'
        }
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'Three', 'control'], function(bootstrap, THREE, Control) {
        $(document)
            .ready(function() {
                var control = new Control(THREE);
            });
    });
});
