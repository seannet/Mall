/**
 * Created by sean-laptop on 17-6-17.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');



var groupSchema = new Schema({
    name : {type : String},
    keyword : {type : String, index:-1, unique:true},
    parent : {type : String},
});

var menuSchema = new Schema({
    label   : {type : String},
    url     : {type : String},
});

var ruleSchema = new Schema({
    label : '',

});


//Common;
groupSchema.statics = common;
menuSchema.statics = common;
ruleSchema.statics = common;
exports.group = mongoose.model('group', groupSchema);
exports.menu = mongoose.model('menu', menuSchema);
exports.rule = mongoose.model('rule', ruleSchema);