var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'IST 320 Jefferson Eagley Week 01'
    });
});

module.exports = router;
