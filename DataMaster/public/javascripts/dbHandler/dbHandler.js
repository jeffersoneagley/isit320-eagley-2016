// requirejs.config({
//     baseUrl: './',
//     paths: {
//         'dbUpdate': 'dbUpdate'
//     }
// });

define('dbHandler', [require, './dbUpdate'], function(_, dbUpdate) {
    'use strict';

    function DbHandler() {

    }

    DbHandler.prototype.updateDbEntry = dbUpdate;
    return DbHandler;
});
