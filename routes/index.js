var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let tasks = require('../app').tasks;
    res.render('index', {tasks: tasks});
});

module.exports = router;
