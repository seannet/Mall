/**
 * Created by sean-laptop on 17-4-15.
 */
var crypto = require('crypto');

exports.inc = {
    title : '',
    user : '',
};

exports.json = function (bool, message, callback) {
    return {
        code : bool ? 200 : 300,
        message : message,
        errors : bool ? 0 : callback,
        data    : bool ? callback : {},
    };
}

exports.unlogin = function () {
    return {
        code : 1000,
        message : '您还没登陆'
    };
}

/* MD5 */
exports.md5     = function (str) {
    return crypto.createHash('md5').update(str).digest("hex")
}

/* Sha1 */
exports.sha1    = function (str) {
    return crypto.createHash('sha1').update(str).digest('hex');
}

/* Sha256 */
exports.sha256  = function (str) {
    return crypto.createHash('sha256').update(str).digest("hex");
}

/* Random */
exports.random1 = function (len) {
    // var wordStorage = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // return Math.random();
    // return Math.random() * (high - low) + low;
    return exports.md5(Math.random()).toString().substr(6, len);
}

exports.random = function (howMany, chars) {
    chars       = chars
        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd     = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len   = chars.length;

    for (var i  = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
}

exports.permission = function(req, res, next, module, arrowUrls){
    module = '/'+module+'/';
    arrowUrls   = arrowUrls || [];

    if (arrowUrls.indexOf(req.url) >=0) {    // no permission
        next();
    } else if (req.session.user) {          // on Login;
        next();
    } else {                                // unLogin;
        //check Html or json;
        if (req.accepts('html')){
            res.redirect('/manager/login?ref='+req.href);
        } else if (req.accepts('json')) {
            //send
            res.send(exports.unlogin());
        } else {
            res.redirect('/404');
        }
    }
}
