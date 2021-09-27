var express = require('express');
var router = express.Router();

var UserModel = require('../models/user-model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users',{title:'Express'});
});


router.get('/add',function(req,res,next){
  res.render('users/add');
});

router.post('/add-process',function(req, res, next){
  
const mybodydata = {
  user_name : req.body.text1,
    user_email : req.body.text2,
    user_Mobile : req.body.text3
}

var data = UserModel(mybodydata);
data.save(function(err){
if(err){
  console.log("Error in this record"+err);
}else{
  console.log("Data Succesfully added");
  res.redirect('/users/add');
}

})

});

//Data Show

router.get('/display', function(req, res, next) {
  UserModel.find(function(err,data){

    if(err){
      console.log("Error in data"+err);
    }else{
      console.log("Succesfully Data Show"+data);
      res.render('users/display',{mydata:data});
    }
  }).lean();

});

//Data Delete

router.get('/delete/:id',function(req,res,next){

   
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err, data){
    if(err)
    {
      console.log("Ther is a problem in this code"+err);
    }else{
      console.log("The Data Succesfully deleted");
      res.redirect('/users/display');
    }
  })
});

//Data Edited

router.get('/edit/:id',function(req,res,next){
  var editid = req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("There is a problem"+err)
    }else{
      console.log("Edit Done Succesfully"+data);
      res.render('users/edit',{mydata:data});
    }
  }).lean();
});

router.post('/edit/:id',function(req,res,next){
  var editid = req.params.id;
  const mybodydata = {
    user_name : req.body.text1,
    user_name : req.body.text2,
    user_Mobile: req.body.text3
  }
  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("There is a problem"+err)
    }else{
      console.log("Edit Done Succesfully"+data);
      res.redirect('/users/display' );
    }
  }).lean();
});
module.exports = router;
