/**
 * Created by sean-laptop on 17-4-13.
 */
var config      = require('../config/config.js');
var mongoose    = require('mongoose');

//Connect;
mongoose.connect(config.db.host);

//On Connected;
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.db.host);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});