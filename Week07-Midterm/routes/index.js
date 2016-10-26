var router = require('./Couch');
/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Jefferson\'s game'
    });
});

module.exports = router;
