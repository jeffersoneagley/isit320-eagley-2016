requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'Three': 'javascripts/three.min',
        'pointerLockControls': 'javascripts/pointerLockControls',
        'pointerLockSetup': 'javascripts/pointerLockSetup',
        'popupQuestion': 'javascripts/popupQuestion',
        'score': 'javascripts/score',
        'control': 'javascripts/control',
        'floor': 'javascripts/level/floors',
        'prettyLights': 'javascripts/level/prettyLights',
        'collisions': 'javascripts/collisions',
        'npcEngine': 'javascripts/npcEngine',
        'drawHud': 'javascripts/display/drawHud'

    },
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
