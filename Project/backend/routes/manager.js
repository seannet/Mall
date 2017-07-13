var express     = require('express');
var router      = express.Router();
var managerDB   = require('../../models/manager');
var manager     = managerDB.manager;
var common      = require('../../lib/common');
var config      = require('../../config/config');


/* Include Params */
var inc = {
    title   : '',
    user    : '',
};
/* Custom*/
var model = manager;
var baseRouter  = '/partner';
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
    list : 'manager/list',
    add  : 'manager/add',
}
var title = {
    list : '管理员列表',
    add : '添加一个管理员',
}
/*End Custom*/

/* GET users listing. */
router.use(function (req, res, next) {

    inc.user    = req.session.user;
    inc.title   = config.name;

    /* Permission */
    var urls = [
        '/login',
        '/login/check',
        '/create',
        '/create/save',
    ];

    if (urls.indexOf(req.url) >=0) {    // no permission
        next();
    } else if (req.session.user) {      // on Login;
        next();
    } else {                            // unLogin;
        //check Html or json;
        if (req.accepts('html')){
            res.redirect('/manager/login');
        } else if (req.accepts('json')) {
            //send
            res.send(common.unlogin());
        } else {
            res.redirect('/404');
        }
    }
})



/* No Permission */
router.get('/login', function (req, res, next) {
    inc.email = req.cookies.email;
    res.render('manager/login', {
        inc     : inc,
    });
})


router.post('/login/check', function (req, res, next) {
    var data ;

    //Load|Find  Data
    model.findOne({email: req.body.email},function(err, data){
        if (data) {
            if (data.is_ban){
                res.send(common.json(false, 'error', {email : '帐号已被锁定'}))
            } else if (data.password == common.md5(req.body.password + data.salt)) {
                req.session.user = {
                    email       : data.email,
                    mobile      : data.mobile,
                    is_admin    : data.is_admin,
                    is_ban      : data.is_ban,
                    created     : data.created,
                    updated     : data.updated
                };
                res.cookie.email = data.email;
                res.send(common.json(true, '登陆成功'));
            } else {
                res.send(common.json(false, '密码不正确', {password : '密码不正确'}));
            }
        } else {
            res.send(common.json(false, '不存在的帐号信息', {email : '不存在的帐号信息'}));
        }
    });

})

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/manager/login');
})

router.get('/create', function (req, res, next) {
    // console.log(common.md5('8e4nL!ve'),
    //     config.session.secret)
    // req.session.testsession = 'test Session Information';
    // res.cookie('testcookie', 'test Cookie Information');
    res.render('manager/create')
})

router.post('/create/save', function (req, res, next) {
    // console.log(md5 = crypto.createHash('md5').update('test').digest("hex"));
    // res.send(common.md5('test'));
    // console.log(common.md5(req.body.model.password), config.session.secret)

    //8e4nL!ve
    if (common.md5(req.body.model.password) == config.session.secret) {
        //Validator Exists;
        var salt = common.random(6);

        //get
        var Manager = new manager({
            email       : req.body.model.email,
            mobile      : '',
            password    : common.md5('werwer102'+salt),
            salt        : salt,
            is_ban      : false,
            is_admin    : true,
            // created     : new Date().now(),
            // updated     : new Date().now(),
        });

        //Save
        Manager.save(function (err, created) {
            if (err) {
                res.send(common.json(false, err));
            } else {
                res.send(common.json(true, '创建成功'));
            }
        });
    } else {
        res.send(common.json(false, '密码不正确', {'password' : '密码不正确'}));
    }
})

/* With Permission |  Login Edit */
router.get('/password', function (req, res, next) {
    //cookie
    console.log(req.cookies.testcookie);
    // session
    console.log(req.session.testsession);
    res.render('manager/password', {
        session : req.session.testsession,
        cookie  : req.cookies.testcookie
    });
})

router.post('/password/save', function (req, res, next) {
    
})

//List
router.get('/list', function (req, res, next) {
    inc.topName = '管理员-列表';
    inc.type    = 'list';
    res.render('manager/list', {
        inc : inc,
        url : url,
        layout : template.layout
    });
})

router.post('/list/data', function (req, res, next) {
    // manager.find({}, function (err, manager) {
    //     res.send(common.json(true, 'ok', manager));
    // })
    var condition       = req.body.search || {};
    var pagination      = req.body.pagination || {};
    pagination.page     = pagination.page || 1;
    pagination.limit    = pagination.limit || 30;
    var skip = (pagination.page - 1) * pagination.limit;
    // condition.is_admin = false;
    // condition.email ='/'+condition.email+'/i';
    manager.find(condition, 'email mobile is_admin is_ban created updated')
        .sort(pagination.sort)
        .skip(skip)
        .limit(pagination.limit).exec(function (err, managers) {
            if (err) {
                res.send(common.json(false, '', err));
            } else {
                res.send(common.json(true, 'ok', {
                    page : pagination.page,
                    limit : pagination.limit,
                    lists : managers,
                    // total : managers.count(),
                }));
            }
    })
})

// router.get('/add', function (req, res) {
//     inc.topName = '管理员-添加';
//     inc.type    = 'add';
//     res.render('manager/add', {inc :inc});
// })
//
// router.post('/add/save', function (req, res, next) {
//     var salt    = common.random(6);
//     var Manager = new manager({
//         email       : req.body.email,
//         mobile      : req.body.mobile,
//         password    : common.md5(req.body.password + salt),
//         salt        : salt,
//
//     })
//
//     Manager.save(function (err, data) {
//         if (err) {
//             res.send(common.json(false, '保存失败', err));
//         } else {
//             res.send(common.json(true, '保存成功', data));
//         }
//     })
// })



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

        var salt        = common.random(6);
        Model.password  = common.md5(req.body.password + salt);

        Model.save(function (err, data) {
            if (data) {
                res.send(common.json(true, '保存成功'));
            } else {
                res.send(common.json(false, err));
            }
        })
    }
})



router.post('/ban', function (req, res, next) {
    manager.findById(req.body.id, function (err, data) {
        if (err) {
            res.send(common.json(false, '', err));
        } else if (data) {
            data.is_ban = !data.is_ban;
            //Save;
            data.save(function (err, todo) {
                res.send(common.json(true, '修改成功', todo));
            })
        }
    })

})

//Information
router.post('/info', function (req,res, next) {
    res.render('manager/info', {inc :inc});
})

router.post('/info/save', function (req, res, next) {
    
})

module.exports = router;
