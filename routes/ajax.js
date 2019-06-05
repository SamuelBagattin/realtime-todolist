const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/findTasks', function (req, res, next) {
    let Task = require('../database/schemas/task');
    Task.find((err, tasksFound) => {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tasksFound));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tasksFound));
        }
    });
});

module.exports = router;
