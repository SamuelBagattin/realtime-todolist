require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socket_io = require('socket.io');
const ent = require('ent');
const mongoose = require('mongoose');

let indexRouter = require('./routes/index');
let ajaxRouter = require('./routes/ajax');

let app = express();
let io = socket_io();
app.io = io;


let tasks = {};
let Task = require('./database/schemas/task');
const db = require('./database/connection');

db.on('error', () => {
    io.onconnection((socket) => {
        socket.emit('db_connection_error')
    })
});

db.once('open', () => {
    io.on("connection", function (socket) {
        socket.on('new_task', function (value) {
            let new_task = new Task({title: value});
            new_task.save((err, added_task) => {
                if (err) {
                    io.emit('add_err', value)
                } else {
                    io.emit('new_task', added_task);
                }
            });
        });
        socket.on('del_task', function (id) {
            Task.deleteOne({ _id: id}, (err, mongooseDeleteResult) => {
                if (err) {
                    io.emit('del_err', id);
                }else{
                    console.log(mongooseDeleteResult);
                    io.emit('del_task', id);
                }
            })
        })
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ajax', ajaxRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = {
    app: app,
    tasks: tasks
};
