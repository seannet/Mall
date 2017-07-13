/**
 * Created by sean-laptop on 17-6-17.
 */




var Bootstrap   = require('../../../../lib/Bootstrap');
var express     = Bootstrap.express;
var router      = express.Router();
var common      = Bootstrap.common;
var config      = Bootstrap.config;

var models      = require(config.path.models+'/permission');
var model       = models.group;



/* Custom*/
var baseRouter  = '/rule';

var url = {
    base    : baseRouter,
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    create  : baseRouter + '/create',
    save    : baseRouter + '/create/save',
    delete  : baseRouter + '/delete',

    ban     : baseRouter + '/ban',


    select  : baseRouter + '/select/',
};
var template = {
    layout : 'layout/home',

    list : 'pages/project/server/list',
    add  : 'pages/project/server/create',
    select  : 'pages/permission/rule/select',
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
    var GID = req.param('gid');

    res.render(template.select, {
        temp : temp,
        url : url,
        layout : template.layout,
    });
})

module.exports = router;