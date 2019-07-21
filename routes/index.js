var express = require('express');
var pathHelper = require('../myModules/pathHelper');
var sender = require('../myModules/sender');
const fs = require('fs');
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


router.post('/financeReports', jsonParser, function(req, res, next) {
  sender.sendFile(req, res, 'financeReports');
});
router.post('/entranceExam', jsonParser, function(req, res, next) {
  sender.sendFile(req, res, 'entranceExam');
});


module.exports = router;
