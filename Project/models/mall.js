/**
 * Created by sean-laptop on 17-6-19.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');


var storeSchema = new Schema({
    name : {type : String, unique: true},
    ename : {type : String, unique:true, index:-1},

});

var themeSchema = new Schema({

})

var productSchema = new Schema({
    name : {type : String},
    sku : {type : String, index:-1},

})



storeSchema.statics = common;
exports.store = mongoose.model('store', storeSchema);