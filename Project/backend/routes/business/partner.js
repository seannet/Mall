/**
 * Created by sean-laptop on 17-5-26.
 */

var Bootstrap   = require('../../../lib/Bootstrap');
var router      = require('express').Router();
var common      = Bootstrap.common;
var inc         = Bootstrap.inc;
var config      = Bootstrap.config;
var Models      = require('../../../models/business')


/* Custom*/
var model       = Models.partner;
var baseRouter  = '/partner';
var url = {
    base    : '/server',
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    add     : baseRouter + '/add',
    save    : baseRouter + '/add/save',
    del     : baseRouter + '/delete',
    ban     : baseRouter + '/ban',
    isShow  : baseRouter + '/isShow',
};
var template = {
    layout : 'layout/home',
    list : 'pages/business/partner/list',
    add  : 'pages/business/partner/add',
}
var title = {
    list : '合作伙伴列表',
    add : '添加新合作伙伴',
}
/*End Custom*/


router.use(function (req, res, next) {

    //Session User;
    inc.user = req.session.user;
    inc.title = config.name;

    /* Permission */
    common.permission(req, res, next, []);
})

/* List */
router.get('/list', function (req, res) {
    inc.title = title.list;
    inc.url = url;

    res.render(template.list, {
        inc : inc,
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
router.get('/add(/:id)?', function (req, res, next) {
    inc.title = title.add;
    inc.url = url;

    var id = req.param('id');
    if (id) {
        model.findById(id, function (err, data) {
            if (data) {
                inc.model = data;

                res.render(template.add, {
                    inc : inc,
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
        inc.model = model.getConst();
        res.render(template.add, {
            inc : inc,
            url : url,
            layout : template.layout
        })
    }

})

router.post('/add/save', function (req, res) {
    if (req.body.model._id) {
        /*Update*/
        model.findById(req.body.model._id, function (err, data) {
            if (data) {
                data = Object.assign(data, req.body.model);
                data.save(function (err, data) {
                    if (err) {
                        res.send(common.json(false, '修改失败', err));
                    } else {
                        res.send(common.json(true, '修改成功'));
                    }
                })
            }
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

// More

router.post('/isShow', function (req, res) {
    var id = req.body.id;
    model.findById(id, function (err, data) {
        if (data) {
            data.isShow = !data.isShow;
            data.save(function (err, data) {
                if(err) {
                    res.json(common.json(false, 'error', err));
                } else {
                    res.json(common.json(true, 'ok'));
                }
            });
        } else {
            res.json(common.json(false, '没找到信息'));
        }
    })
})

// router.get('/test', function (req, res) {
//     // project.saver();
//     console.log(project.schema.obj)
// })

module.exports = router;