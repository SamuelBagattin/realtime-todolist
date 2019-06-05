const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String
});

let Task = mongoose.model('Task', taskSchema);

module.exports = Task;
