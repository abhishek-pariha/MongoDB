var express = require('express');
var router = express.Router();

var UserModel = require('../models/admin-model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.post('/signup', function(req, res, next) {
    var fileobject = req.files.file123;
    var filename = req.files.file123.name;
    
    const mybodydata = {
        admin_email : req.body.name,
        admin_password : req.body.password,
        admin_photo : filename
    }

    var data = UserModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log("Error in Insert"+err);
        }else{
            console.log("INsert Successfully");
            fileobject.mv('public/upload/'+filename,function(err){
                if(err) throw err;
                res.redirect('signup');    
            });
            
        }
    })
});

//display
router.get('/table',function(req, res, next){
  UserModel.find(function(err, data){
      if(err){
          console.log("Error in display"+err);
      }else{
          console.log("Successfully display"+data);
          res.render('table',{mydata : data});
      }
  }).lean();
});

//Delete
router.get('/delete/:id',function(req,res,next){
  
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err, data){
    if(err)
    {
      console.log("Ther is a problem in this code"+err);
    }else{
      console.log("The Data Succesfully deleted");
      res.redirect('/table');
    }
  }).lean();
});

//Login
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',function(req, res, next){
   
  var email = req.body.admin_email;
  var password = req.body.admin_password;
  console.log(req.body);
  UserModel.findOne({'user_email' : email}, function(err, db_users){

    console.log("Find One"+ db_users);

    if(db_users){
      var db_email = db_users.admin_email;
      var db_password = db_users.admin_password;
    }

    console.log("db_users.email"+db_email);
    console.log("db_users.password"+db_password);

    if(db_email == null)
    {  
      console.log("if")
      res.end("Email not found");
    }
    else if(db_email == email && db_password == password){
      req.session.email = db_email;
      res.redirect('/index');
    }
    else{
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  })
})

module.exports = router;
