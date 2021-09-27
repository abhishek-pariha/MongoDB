

var express = require('express');
var router = express.Router();

var StudentModel = require('../models/student-model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('student',{title:'Express'});
});


router.get('/add',function(req,res,next){
  res.render('student/add');
});