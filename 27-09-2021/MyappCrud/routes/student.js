var express = require('express');
var router = express.Router();

var UserModel = require('../models/student_models');

router.get('/', function(req, res, next){
    //res.send('response with resourse');
    res.render('index',{title : 'Express'});
})

router.get('/add', function(req, res, next){
    res.render('student_view/add');
})

router.post('/add-process', function(req, res, next){
    const mybodydata = {
        student_name : req.body.name,
        student_email : req.body.email,
        student_password : req.body.password,
        student_gender : req.body.gender,
        student_address : req.body.city
    }

    var data = UserModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log("Error in this record"+err)
        }else{
            console.log("data Succesfully added");
            res.redirect('add');
        }
    })
});

//Display

router.get('/display',function(req, res, next){
    UserModel.find(function(err,data){
        if(err){
            console.log("Error in data"+err);
        }else{
            console.log("Succesfully Data Show"+data);
            res.render('student_view/display',{mydata : data});
        }
    }).lean();
})

//Delete
router.get('/delete/:id',function(req, res, next){
    var deleteid = req.params.id;
    UserModel.findByIdAndDelete(deleteid,function(err,data){
        if(err){
            console.log("Error is data"+err);
        }else{
            console.log("Succesfully Data Deleted"+data);
            res.redirect('/student_view/display');
        }
    })
});

//Edit
router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    UserModel.findById(editid,function(err, data){
        if(err){
            console.log("Error in data"+err)
        }else{
            console.log("Sucessfully Data Edited"+data);
            res.render('student_view/edit',{mydata:data});
        }
    }).lean();
});

router.post('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    const mybodydata = {
        student_name : req.body.name,
        student_email : req.body.email,
        student_password : req.body.password,
        student_gender : req.body.gender,
        student_address : req.body.city
    }

    UserModel.findByIdAndUpdate(editid,mybodydata,function(err, data){
        if(err){
            console.log("Error in thi"+err);
        }else{
            console.log("Edit Sucessfully"+data);
            res.redirect("/student_view/display");
        }
    }).lean();
});
module.exports = router;
