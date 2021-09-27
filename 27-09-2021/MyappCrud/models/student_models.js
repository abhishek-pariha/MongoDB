var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    student_name : String,
    student_email : String,
    student_password : String,
    student_gender : String,
    student_address : String
});

module.exports = mongoose.model('student',mySchema);