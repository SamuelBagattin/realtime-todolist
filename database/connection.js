const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
let db = mongoose.connection;
module.exports = db;
