var express = require('express');
var sender = require('../myModules/sender');
var pathHelper = require('../myModules/pathHelper');
const fs = require('fs');
const zlib = require('zlib');
var db = require('../myModules/db');

var router = express.Router();
const bodyParser = require('body-parser');

// Create application/json parser
var jsonParser = bodyParser.json();

router.get('/', function(req, res, next) {
  sender.sendPage(res, 'index');
});
router.get('/teachers', function(req, res, next) {
  sender.sendPage(res, 'teachers');
});
router.get('/entranceExam', function(req, res, next) {
  sender.sendPage(res, 'entranceExam');
});
router.get('/financeReports', function(req, res, next) {
  sender.sendPage(res, 'financeReports');
});
router.get('/contacts', function(req, res, next) {
  sender.sendPage(res, 'contacts');
});
router.get('/news', function(req, res, next) {
  sender.sendPage(res, 'news');
});
router.get('/news', function(req, res, next) {
  sender.sendPage(res, 'news');
});
router.get('/newsIcon/:filename', function(req, res, next) {
  res.sendFile(pathHelper.dataDirectory + '/news_drive/' + req.params.filename)
});
// router.get('/news', function(req, res, next) {
//   sender.sendPage(res, 'news');
//   var files = [ ];
//   var titles = [ ];
//   var monthes = [ ];
//   var days = [ ];
//   fs.readdirSync(dataPath).forEach(element => {
//     let parts = element.split('.');
//     let date = element.split('$');
//     if(parts[1] != 'docx'){
//       titles.push(parts[1]);
//       files.push(fs.readFileSync(pathHelper.dataDirectory + 'news_drive/' +  element));
//       monthes.push(date[2]);
//       days.push(date[1]);
//     }
//   });
//   let objFiles = { };
//   let objTitles = { };
//   let objMonthes = { };
//   let objDays = { };
//   for (const key in files) {
//     objFiles[key] = files[key];
//     objTitles[key] = titles[key];
//     objMonthes[key] = monthes[key];
//     objDays[key] = days[key];
//   }
//   let obj = { 
//     images : objFiles,
//     titles : objTitles,
//     monthes : objMonthes,
//     days : objDays
//    };
//   res.send(obj);
// });


router.post('/financeReports', jsonParser, function(req, res, next) {
  sender.sendFile(req, res, 'financeReports');
});
router.post('/entranceExam', jsonParser, function(req, res, next) {
  sender.sendFile(req, res, 'entranceExam');
});
router.post('/news', jsonParser, function(req, res, next) {
  res.send(db.getNews(req.body.page, req.body.amount));
  // let titles = [];
  // let dates = [];
  // let images = [];
  // let allFiles = Array.from(fs.readdirSync('../data/news_drive')).forEach(element =>{

  // });
  // res.send({
  //   titles : titles,
  //   dates : dates,
  //   images : images 
  // });
});


module.exports = router;
