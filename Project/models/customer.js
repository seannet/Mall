/**
 * Created by sean-laptop on 17-5-22.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var customerSchema = new Schema({
    name : {type : String, unique: true, required : true},
    mobile : [{
        name : {type : String},
        no : {type : String},
    }],
    phone : {type : String},
    address : {type: String},
    fax : {type : String},

});

exports.customer = mongoose.model('customer', customerSchema);