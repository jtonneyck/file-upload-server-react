var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var app = express();
var config = require("./config.json")
var cors = require("cors")

app.use(cors({
    origin: [config.client],
    credentials: true
}))
mongoose.connect(config.db, (err)=> {
    if(err) console.log(err)
    else console.log("connected to mongodb")
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use('/', require('./routes/users'));

module.exports = app;
