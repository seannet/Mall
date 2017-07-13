/**
 * Created by sean-laptop on 17-6-17.
 */

module.exports = [
    {
        label   : '管理员',
        url     : '',
        child   : '',
    }
]



var Bootstrap   = require('../../../../lib/Bootstrap');
var express     = Bootstrap.express;
var router      = express.Router();
var common      = Bootstrap.common;
var config      = Bootstrap.config;

var models      = require(config.path.models+'/permission');
var model       = models.group;



/* Custom*/
var baseRouter  = '/group';

var url = {
    base    : baseRouter,
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    create  : baseRouter + '/create',
    save    : baseRouter + '/create/save',
    delete  : baseRouter + '/delete',

    ban     : baseRouter + '/ban',
};
var template = {
    layout : 'layout/home',

    list : 'pages/project/server/list',
    add  : 'pages/project/server/create',
}

var title = {
    list : '组列表',
    add : '添加组',
}

/* Include Params */
var temp = {
    title   : '',
    footer  : '',
    user    : '',
};
/*End Custom*/

router.get('/select/:gid', function (req, res) {
    
})

module.exports = router;