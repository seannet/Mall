/**
 * Created by sean-laptop on 17-6-21.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');

//产品
var productSchema = new Schema({
    SID     : {type : Schema.Types.ObjectId}, //Store ID;
    name    : {type : String},
    sku     : {type : String},
    price   : {type : Number},
    market  : {type : Number},

    color : [{id : String, name : String, url : String, rgb: String}],
    size : [{id : String, name : String}],

    img : [{url : String}],
    desc : {type : String},

    tags : [],
});

//分类
var categorySchema = new Schema({
    name : {type : String},
    cat1 : {type : String},
    cat2 : {type : String},
    cat3 : {type : String},
    cat4 : {type : String},
    catType : {type : Number, default: 0}
});

//组合套装
var setsSchema = new Schema({
    name : {type : String},
    ids : [{pid : String}],
});

//统计
var viewSchema = new Schema({
    pid : {type : String},
    day : {type : String},
    view : {type : Number},
    order : {type : Number},
});

productSchema.statics = common;
categorySchema.statics = common;
setsSchema.statics = common;
viewSchema.statics = common;

exports.product = mongoose.model('product', productSchema);
exports.category = mongoose.model('category', categorySchema);
exports.sets = mongoose.model('sets', setsSchema);
exports.view = mongoose.model('view', viewSchema);