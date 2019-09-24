var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var schedule = require('./myModules/news');
var db = require('./myModules/db');
var app = express();

var indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//db.createNewsRowsCount();
//console.log('done');

//schedule.startSchedule();

module.exports = app;
