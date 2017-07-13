/**
 * Created by sean-laptop on 17-5-23.
 */

var Bootstrap   = require('../../../lib/Bootstrap');
var router      = require('express').Router();
var common      = Bootstrap.common;
var inc         = Bootstrap.inc;
var config      = Bootstrap.config;
var Models      = require('../../../models/project')


/* Custom*/
var model       = Models.domain;
var baseRouter  = '/domain';
var url = {
    base    : '/server',
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    add     : baseRouter + '/add',
    save    : baseRouter + '/add/save',
    del     : baseRouter + '/delete',
    ban     : baseRouter + '/ban',
};
var template = {
    layout : 'layout/home',
    list : 'pages/project/domain/list',
    add  : 'pages/project/domain/add',
}
var title = {
    list : '域名商列表',
    add : '添加域名商',
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
router.get('/add(/:id)?', function (req, res) {
    inc.title = title.add;
    inc.url = url;

    var id = req.param('id');
    if (id) {
        model.findById(id, function (err, data) {
            inc.model = data;

            res.render(template.add, {
                inc : inc,
                url : url,
                layout : template.layout
            })
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