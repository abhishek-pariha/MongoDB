var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = {
    student_name : String,
    student_age :  Number,
    student_gender : String,
    student_email : String,
    student_password : String,
    student_joindate : Date,
    student_mobile : Number
}

module.exports = mongoose.model('student',mySchema);