var express = require('express');
var router = express.Router();
//var CityModel = require('../models/city-model');
var StateModel = require('../models/state-model');
var CityModel = require('../models/city-model');
var CountryModel = require('../models/country-model');


router.get('/',function(req, res, next){
    res.end("respond with resource");
})

router.get('/add',function(req, res, next){
    StateModel.find(function(err, data){
        if(err){
            console.log("Error in showing data"+err);
        }else{
            console.log("Successflly show form"+data);
            res.render('city/add',{mydata : data});
        }
    })
})

router.post('/add',function(req, res, next){
    
    const mybodydata = {
        city_name : req.body.name,
        _state : req.body._state
    }

    var data = CityModel(mybodydata);
    data.save(function(err, data){
        if(err){
            console.log('Error in adding data'+err);
        }else{
            console.log("Successfully save"+data);
            res.redirect('/city/add');
        }
    })
})

router.get('/display',function(req, res, next){
    CityModel.find(function(err, data){
        CityModel.find({}).populate('_state').exec(function(err){
            res.render('city/display',{mydata : data});
        })
    })
})
module.exports = router;