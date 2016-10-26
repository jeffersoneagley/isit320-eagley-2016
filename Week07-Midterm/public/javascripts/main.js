requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'Three': 'javascripts/three.min',
        'pointerLockControls': 'javascripts/pointerLockControls',
        'pointerLockSetup': 'javascripts/pointerLockSetup',
        'control': 'javascripts/control',
        'floor': 'javascripts/floors',
        'collisions': 'javascripts/collisions',
        'npcEngine': 'javascripts/npcEngine'

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
