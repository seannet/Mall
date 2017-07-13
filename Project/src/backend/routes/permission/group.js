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

    list : 'basic/permission/group/list',
    create  : 'basic/permission/group/create',
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


router.use(function (req, res, next) {

    //Session User;
    temp.user = req.session.user;
    temp.title = config.name;

    /* Permission */
    common.permission(req, res, next, []);
})





/* Create */
router.get('/create(/:id)?', function (req, res, next) {
    temp.title = title.add;
    temp.url = url;

    var id = req.param('id');
    if (id) {
        model.findById(id, function (err, data) {
            if (data) {
                temp.model = data;

                res.render(template.create, {
                    temp : temp,
                    url : url,
                    layout : template.layout
                })
                next();
            } else {
                res.status(404);

                // respond with html page
                if (req.accepts('html')) {
                    res.render('404', { url: req.url });
                    return;
                }
            }
        })

    } else {
        temp.model = model.getConst();

        res.render(template.create, {
            temp : temp,
            url : url,
            layout : template.layout
        })
    }

})


router.post('/create/save', function (req, res) {
    console.log(req.body.model._id);
    if (req.body.model._id) {
        /*Update*/
        model.findById(req.body.model._id, function (err, data) {
            data = Object.assign(data, req.body.model);
            data.save(function (err, data) {
                if (err) {
                    res.send(common.json(false, '修改失败', err));
                } else {
                    res.send(common.json(true, '修改成功'));
                }
            })
        })
    } else {
        /*Insert*/
        var Model = new model(req.body.model);

        Model.save(function (err, data) {
            if (data) {
                res.send(common.json(true, '保存成功'));
            } else {
                res.send(common.json(false, err));
            }
        })
    }
})


/* List */
router.get('/list', function (req, res) {
    temp.title = title.list;
    temp.url = url;

    res.render(template.list, {
        temp : temp,
        url : url,
        layout : template.layout
    })
})

router.post('/list/data', function (req, res) {
    model.dataList(req, model, function (err, data) {
        if (err) {
            res.send(common.json(false, '没有信息了'));
        } else {
            res.send(common.json(true, 'OK', data));
        }
    })
})


// router.get('/test', function (req, res) {
//     // project.saver();
//     console.log(project.schema.obj)
// })

module.exports = router;