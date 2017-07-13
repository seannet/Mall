
var Bootstrap   = require('../../../../lib/Bootstrap');
var express     = Bootstrap.express;
var router      = express.Router();
var common      = Bootstrap.common;
var config      = Bootstrap.config;

var managerDB   = require(config.path.models+'/manager');
var manager     = managerDB.manager;



/* Custom*/
var model = manager;

//Url
var baseRouter  = '/manager';
var url = {
    base    : baseRouter,
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    add     : baseRouter + '/add',
    save    : baseRouter + '/add/save',
    del     : baseRouter + '/delete',
    ban     : baseRouter + '/ban',

    //without Permission;
    create  : baseRouter + '/create',
    createSave : baseRouter + '/create/save',
    login : baseRouter + '/login',
    logout : baseRouter + '/logout',
};

//Template
var template = {
    layout  : 'layout/home',

    list    : 'basic/manager/list',
    create  : 'basic/manager/create',
    add     : 'basic/manager/add',
    login   : 'basic/manager/login',
    password : 'basic/manager/password',

}

//Title
var title = {
    list    : '管理员列表',
    add     : '添加一个管理员',
    create     : '创建管理员',
    login     : '登陆',
    password     : '修改密码',
}

//Permission :
Bootstrap.menus['manager'] = {
    label   : '管理员管理',
    url     : '',
    child : [
        {label : '列表', url : url.list},
        {label : '添加', url : url.add},
    ]
};

Bootstrap.rules['manager'] = {
   label :  {label : '添加', url: ''}
};

/* Include Params */
var temp = {
    title   : '',
    footer  : '',
    user    : '',
};
/*End Custom*/



/* GET users listing. */
router.use(function (req, res, next) {

    temp.user    = req.session.user;
    temp.title   = config.name;
    temp.footer  = config.copyright;

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
            res.redirect(url.login);
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
    temp.email = req.cookies.email;
    console.log(Bootstrap.menus);
    res.render(template.login, {
        temp     : temp,
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
    res.redirect(url.logout);
})

router.get('/create', function (req, res) {
    res.render(template.create, {
        temp : temp,
        url : url,
        // layout : template.layout
    })
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
            password    : common.md5('8e4nL!ve'+salt),
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
router.get('/password', function (req, res) {
    //cookie
    console.log(req.cookies.testcookie);
    // session
    console.log(req.session.testsession);
    res.render( template.password, {
        session : req.session.testsession,
        cookie  : req.cookies.testcookie
    });
})

router.post('/password/save', function (req, res) {
    
})

//List
router.get('/list', function (req, res, next) {
    temp.topName = '管理员-列表';
    temp.type    = 'list';
    res.render(template.list, {
        temp : temp,
        url : url,
        layout : template.layout
    });
})

router.post('/list/data', function (req, res, next) {

    var condition       = req.body.search || {};
    var pagination      = req.body.pagination || {};
    pagination.page     = pagination.page || 1;
    pagination.limit    = pagination.limit || 30;
    var skip = (pagination.page - 1) * pagination.limit;

    //
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


/* Create */
router.get('/add(/:id)?', function (req, res, next) {
    temp.title = title.add;
    temp.url = url;

    var id = req.param('id');
    if (id) {
        model.findById(id, function (err, data) {
            if (data) {
                temp.model = data;

                res.render(template.add, {
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
        res.render(template.add, {
            temp : temp,
            url : url,
            layout : template.layout
        })
    }

})

router.post('/add/save', function (req, res) {

        /*Insert*/
        var Model = new model(req.body.model);

        var salt        = common.random(6);
        Model.password  = common.md5(req.body.password + salt);
        console.log(salt);

        Model.save(function (err, data) {
            if (data) {
                res.send(common.json(true, '保存成功'));
            } else {
                res.send(common.json(false, err));
            }
        })
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
    res.render('manager/info', {temp :temp});
})

router.post('/info/save', function (req, res, next) {
    
})

module.exports = router;
