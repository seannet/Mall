/**
 * Created by sean-laptop on 17-4-13.
 */
// var connect     = require('../lib/mongoConnection');

//Require Schema;
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');

var informationSchema   = new Schema({
    nickname :  {type : String},
    truename :  {type : String},
    age :       {type : Number},

});


//Schema Construct;
var managerSchema       = new Schema({
    email :     {type : String, index : true, required: true, unique:true, lowercase: true },
    mobile :    {type : String, index : true, unique:true},
    password :  {type : String, required : true},
    salt :      {type : String, required : true},
    is_ban :    {type : Boolean, default : false},
    is_admin :  {type : Boolean, default : false},
    // created :   {type : Date, default : Date.now()},
    // updated :   {type : Date, default: Date.now()}

}, {timestamps : {createAt : 'created', updateAt : 'updated'}});

managerSchema.statics = common;
exports.manager = mongoose.model('manager', managerSchema);

