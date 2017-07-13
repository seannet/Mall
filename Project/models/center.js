/**
 * Created by sean-laptop on 17-4-18.
 */
var connect     = require('../lib/mongoConnection');
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Center 体育中心|健身房|运动场馆
var centerSchema    = new Schema({
    name        :   {type : String, required : true , index : true}, //名称
    sku         :   {type : String, required: true, index : true},
    opentime    :   {
        open    : {type : String},
        close   : {type : String},
        weekly  : [String],
    }, //
    price     :   {
        year    :   {type   : String},
        season  :   {type   : String},
        month   :   {type   : String},
        week    :   {type   : String},
        daily   :   {type   : String},
    },
    location    :   {
        province    :   {type   : String},
        city        :   {type   : String},
        area        :   {type   : String},
        address     :   {type   : String, required: true},
    },
    images      : {},
    describe    : {type : String},
    is_coach    :   {type : Boolean, default : false},
    is_lent     :   {type : Boolean, default : false},
    // created : {type : initializeTimestamps()},
    // updated : {type : initializeTimestamps()}
});

/* 课程 */
var courseSchema    = new Schema({
    name    :   {type : String},

});

/* 教练 */
var coachSchema     = new Schema({
    nickname    : {type : String},
    truename    : {type : String},

});

 exports.center     = mongoose.model('center', centerSchema);
 exports.coach      = mongoose.model('coach', coachSchema);
 exports.course     = mongoose.model('course', courseSchema);

// console.log(center.findOne());
// exports = mongoose.model('center');