/**
 * Created by sean-laptop on 17-5-16.
 */
var connect     = require('../lib/mongoConnection');

//Require Schema;
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

//Account
var userSchema      = new Schema({
    email       : {type : String, required : true, unique: true, lowercase: true },
    mobile      : {type : String, required: true, unique: true},
    password    : {type : String, required: true},
    salt        : {type : String, required: true},
    is_ban      : {type : Boolean, default: false},
    created     : {type: Date , default: Date.now()},
    updated     : {type: Date , default: Date.now()},
});


//Information;
var infoSchema  = new Schema({
    nickname    : {type: String},
    dob         : {type : Date},
    avatar      : {type : String},
});

exports.user = mongoose.model('user', userSchema);