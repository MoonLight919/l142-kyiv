var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var schedule = require('./myModules/news');
var db = require('./myModules/db');
var pathHelper = require('./myModules/pathHelper');
var app = express();

var router = require('./router');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

//db.truncateTable('additional');
//db.createNewsRowsCount();
//console.log('done');

schedule.startSchedule('0 12 * * *');

module.exports = app;
