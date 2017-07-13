/**
 * Created by sean-laptop on 17-6-13.
 */
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');

var categorySchema = new Schema({
    label : {type : String},
    type : {type: String}
});

var projectSchema   = new Schema({
    name :  {type : String},
    view :  {type : String},
    images : [{url : String}],
    tags :  {type : Number},
});


managerSchema.statics = common;
exports.manager = mongoose.model('frontend', managerSchema);