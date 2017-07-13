/**
 * Created by sean-laptop on 17-4-13.
 */

// exports.db          = 'mongodb://127.0.0.1:27017/sports_life';
// exports.name        = 'Sports Life+';
// exports.redis       = {host : 'localhost', port : '6379'};
// exports.session     = {secret : '756903fe7a5587fd2d40fbc9578e0612'};

module.exports = {
    name : 'SportsLife',
    redis : {
        host : 'localhost',
        port : '6379'
    },
    session : {
        secret : '756903fe7a5587fd2d40fbc9578e0612',
    },
    db : {
        host : 'mongodb://127.0.0.1:27017/sports_life'
    }
};

