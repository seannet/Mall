/**
 * Created by sean-laptop on 17-4-13.
 */

// exports.db          = 'mongodb://127.0.0.1:27017/sports_life';
// exports.name        = 'Sports Life+';
// exports.redis       = {host : 'localhost', port : '6379'};
// exports.session     = {secret : '756903fe7a5587fd2d40fbc9578e0612'};

module.exports = {
    port : {
        backend : 6011,
        frontend : 6012,
        api : 6013,
        app : 6014,
    },

    path : {
        // base    : base,
        // models  : base + '/models',
        models  :  '../../../../models'

    },

    name : 'Mall',
    copyright : 'Powered By 10Page Team',
    redis : {
        host : 'localhost',
        port : '6379'
    },
    session : {
        secret : '756903fe7a5587fd2d40fbc9578e0612',
        Msecret : '756903fe7a5587fd2d40fbc9578e0612',
    },
    db : {
        host : 'mongodb://127.0.0.1:27017/mall'
    }
};

