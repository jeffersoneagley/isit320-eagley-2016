requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'control': 'javascripts/control',
        'dbHandler': 'javascripts/dbHandler'
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'control'], function(bootstrap, Control) {
        $(document)
            .ready(function() {
                //console.log('ready!');
                var control = new Control();
                //console.log('control');
            });
    });
});
