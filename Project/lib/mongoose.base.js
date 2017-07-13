/**
 * Created by sean-laptop on 17-5-23.
 */
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

Schema.static.saver123 = function (err, callback) {
    console.log('test statics saver');
}

module.exports = Schema;