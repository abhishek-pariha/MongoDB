var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    city_name : String,
    _state : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'state'
    },
    _country : 
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'country'
            }
})
module.exports = mongoose.model('city',mySchema);