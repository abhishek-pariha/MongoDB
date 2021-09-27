var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    user_name : String,
    user_email : String,
    user_Mobile : Number
});

module.exports = mongoose.model('user',mySchema);