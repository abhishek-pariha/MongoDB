var express = require('express');
var router = express.Router();

var UserModel = require('../models/user_models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function(req, res, next){
  res.render('UserView/add');
})

router.post('/add-user',function(req, res, next){
  const mybodydata = {
    user_name : req.body.name,
    user_email : req.body.email,
    user_password : req.body.password
  }

  var data = UserModel(mybodydata);
  data.save(function(err,data){
    if(err){
      console.log("Error id Save fuction"+err);
    }else{
      console.log("Data Successfully Inserted"+data);
      res.redirect('add');
    }
  })
});

//Display

router.get('/display',function(req, res, next){
  UserModel.find(function(err,data){
    if(err){
      console.log("Error in display"+err);
    }else{
      console.log("Data Successfully Display"+data);
      res.render("UserView/display",{mydata : data});
    }
  }).lean();
})

//Delete

router.get('/delete/:id',function(req, res, next){

  var deletid = req.params.id;
  UserModel.findByIdAndDelete(deletid,function(err,data){
    if(err){
      console.log("Error in Delete"+err);
    }else{
      console.log("Data Successfully Deleted"+data);
      res.redirect('/UserView/display');
    }
  })
});

//Edit
router.get('/edit/:id',function(req, res, next){

  var edititd = req.params.id;
  UserModel.findById(edititd, function(err,data){
    if(err){
      console.log("Error in Edit"+err);
    }else{
      console.log("Succefully edited"+data);
      res.render('UserView/edit',{mydata:data});
    }
  }).lean();
});

router.post('/edit/:id',function(req, res, next){
  
  var editid = req.params.id;
  const mybodydata = {
    user_name : req.body.name,
    user_email : req.body.email,
    user_password : req.body.password
  }

  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit"+err);
    }else{
      console.log("Data Successfully Edited"+data);
      res.redirect('/UserView/edit');
    }
  }).lean();
})

module.exports = router;
