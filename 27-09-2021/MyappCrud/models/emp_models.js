var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mySchema = new Schema({
    emp_name : String,
    emp_salary : Number,
    emp_desi : String
})

module.exports = mongoose.model('employee',mySchema);