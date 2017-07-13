/**
 * Created by sean-laptop on 17-5-22.
 */


var Bootstrap   = require('../../../lib/Bootstrap');
var router      = require('express').Router();
var common      = Bootstrap.common;
var inc         = Bootstrap.inc;
var config      = Bootstrap.config;
var Models      = require('../../../models/project')

// var project     = Models.project;
// var domain      = Models.domain;
// var server      = Models.server;
// var test      = Models.test;


/* Custom*/
var model       = Models.project;
var server      = Models.server;
var domain      = Models.domain;
var baseRouter  = '/project';
var url = {
    base    : '/server',
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    add     : baseRouter + '/add',
    save    : baseRouter + '/add/save',
    del     : baseRouter + '/delete',
    ban     : baseRouter + '/ban',
    form    : baseRouter + '/form.json',
};
var template = {
    layout : 'layout/home',
    list : 'pages/project/project/list',
    add  : 'pages/project/project/add',
}
var title = {
    list : '项目列表',
    add : '添加项目',
}
/*End Custom*/



router.use(function (req, res, next) {

    //Session User;
    inc.user  = req.session.user;
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
    model.dataList(req, function (err, data) {
        if (err) {
            res.send(common.json(false, '没有更多信息了'));
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
            if (data) {
                inc.model = data;

                res.render(template.add, {
                    inc : inc,
                    url : url,
                    layout : template.layout
                })
                return;
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


router.post('/form.json', function (req, res) {
    var form = {};
    form.serverList = server.find({},['id', 'name']).then(function (data) {
        form.serverList = data;
    }).then(function () {
        domain.find({}, ['id', 'name']).then(function (data) {
            form.domainList = data;
            res.json(common.json(true, 'ok', {form : form}));
        })
    });

})



// router.get('/test', function (req, res) {
//     // project.saver();
//     console.log(project.schema.obj)
// })

module.exports = router;