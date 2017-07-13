/**
 * Created by sean-laptop on 17-6-21.
 */

var Bootstrap   = require('../../../../lib/Bootstrap');
var express     = Bootstrap.express;
var router      = express.Router();
var common      = Bootstrap.common;
var config      = Bootstrap.config;

var managerDB   = require(config.path.models+'/product');
var model       = managerDB.product;


/* Custom */
var baseRouter = '/product';


var url = {
    base    : baseRouter,
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    create  : baseRouter + '/create',
    save    : baseRouter + '/create/save',
    delete  : baseRouter + '/delete',

    ban     : baseRouter + '/ban',
};

var layout  = {
    list    : 'layout/crud/list',
    create  : 'layout/crud/create'
};
var template = {
    layout : 'layout/home',

    list    : 'pages/product/product/list',
    create  : 'pages/product/product/create'
}
var title = {
    list : '商品列表',
    create : '添加商品',
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


/* Create */
router.get('/create(/:id)?', function (req, res, next) {
    temp.title = title.create;
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
            layout : layout.create
        })
    }

})

router.post('/create/save', function (req, res) {
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



// router.get('/test', function (req, res) {
//     // project.saver();
//     console.log(project.schema.obj)
// })

module.exports = router;