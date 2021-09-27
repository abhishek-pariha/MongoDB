var express = require('express');
var router = express.Router();

var UserModel = require('../models/emp_models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function(req, res, next){
    res.render('EmpView/add');
})

router.post('/add-emp',function(req, res, next){
    const mybodydata = {
        emp_name : req.body.name,
        emp_salary : req.body.salary,
        emp_desi : req.body.desi
    }

    var data = UserModel(mybodydata);
    data.save(function(err,data){
        if(err){
            console.log("Error in Save"+err);
        }else{
            console.log("Successfully Saved"+data);
            res.redirect('add');
        }
    })
})

//display

router.get('/display',function(req, res, next){
    UserModel.find(function(err, data){
        if(err){
            console.log("Error in Display"+err);
        }else{
            console.log("Display Successfully"+data);
            res.render("EmpView/display",{mydata : data});
        }
    }).lean();
});

//delete

router.get('/delete/:id',function(req, res, next){
    var deletid = req.params.id;
    UserModel.findByIdAndDelete(function(err,data){
        if(err){
            console.log("Error in Delete"+err);
        }else{
            console.log("Delete Successfully"+data);
            res.redirect('/EmpView/display');
        }
    });
});

//edit
router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    UserModel.findById(function(err, data){
        if(err){
            console.log("Error in Edit"+err);
        }else{
            console.log("Successfully Edited"+data);
            res.render('EmpView/edit',{mydata : data});
        }
    }).lean();
});
router.post('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    const mybodydata = {
        emp_name : req.body.name,
        emp_salary : req.body.salary,
        emp_desi : req.body.desi
    } 
    UserModel.findByIdAndUpdate(function(err, data){
        if(err){
            console.log("Error in Edit"+err);
        }else{
            console.log("Edit Successflly"+data);
            res.redirect('EmpView/display');
        }
    }).lean();
});
module.exports = router;