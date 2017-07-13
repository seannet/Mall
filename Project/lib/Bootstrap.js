/**
 * Created by sean-laptop on 17-5-6.
 */

module.exports = {
    //Basic;
    express         : require('express'),
    path            : require('path'),
    favicon         : require('serve-favicon'),
    logger          : require('morgan'),
    //
    // config          : require(''),
    common          : require('./common'),
    inc             : require('./inc'),
    //Cookie | Session;
    bodyParser      : require('body-parser'),
    cookie          : require('cookie-parser'),
    session         : require('express-session'),
    redis           : require('connect-redis'),
    // engine          : require('ejs-locals'),
    ejsLayout       : require('express-ejs-layouts'),

    //Config
    config          : require('../config/config'),

    //DB
    mongoConnection : require('./mongoConnection'),

    //Template
    title           : {},


    //Permission;
    menus           : {},
    rules           : {},

    //Url
    // urlHelper       : require('../routes/routes.js'),

}