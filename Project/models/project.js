/**
 * Created by sean-laptop on 17-5-22.
 */
//Require Schema;
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var common          = require('../lib/schema.common');

//Schema Construct;
/*Project*/
var projectSchema       = new Schema({
    name    : {type : String, index : true, required: true},
    desc    : {type : String, index : true},

    demoUrl : {type : String},
    productUrl : {type : String},
    gitUrl : {type : String},
    docUrl : {type : String},
    fileUrl : {type : String},

    Server : {type : Schema.ObjectId, ref: 'server'},
    Domain : {type : Schema.ObjectId, ref: 'domain'},
    // customer : {type : Schema.ObjectId, ref: 'customer'},


    created : {type : Date, default : Date.now()},
    updated : {type : Date, default: Date.now()}

});

/*Server*/
var serverSchema = new Schema({

    name : {type : String},
    url : {type : String},
    account : {type : String},
    password : {type : String},
    created : {type : Date, default : Date.now()},
    updated : {type : Date, default : Date.now()}
});

/*Domain*/
var domainSchema = new Schema({

    name : {type : String},
    url : {type : String},
    account : {type : String},
    password : {type : String},
    created : {type : Date, default : Date.now()},
    updated : {type : Date, default : Date.now()}
});

projectSchema.statics = common;
serverSchema.statics = common;
domainSchema.statics = common;


exports.project = mongoose.model('project', projectSchema);
exports.server = mongoose.model('server', serverSchema);
exports.domain = mongoose.model('domain', domainSchema);

