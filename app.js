let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let socket_io = require('socket.io');
let ent = require('ent');

let indexRouter = require('./routes/index');

let app = express();
let io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

let taskId = 0;
let tasks = {};
io.on("connection", function (socket) {
    socket.on('new_task', function (value) {
        taskId++;
        tasks[taskId] = value;
        io.emit('new_task', {value: value, id: taskId});
    });
    socket.on('del_task', function (id) {
        delete tasks[id];
        io.emit('del_task', id);
    })
});

module.exports = {
    app: app,
    tasks: tasks
};
