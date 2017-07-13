/**
 * Created by sean-laptop on 17-5-26.
 */
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');


var partnerSchema = new Schema({
    name : {type : String},
    logo : {type : String},
    url : {type : String},
    isShow : {type : Boolean, default: false}
});

var businessSchema = new Schema({

});

var categorySchema = new Schema({

})

//Common;
partnerSchema.statics = common;
businessSchema.statics = common;
exports.partner = mongoose.model('partner', partnerSchema);
exports.business = mongoose.model('business', businessSchema);