/**
 * Created by sean-laptop on 17-6-21.
 */


var Bootstrap   = require('../../../../lib/Bootstrap');
var express     = Bootstrap.express;
var router      = express.Router();
var common      = Bootstrap.common;
var config      = Bootstrap.config;

var managerDB   = require(config.path.models+'/product');
var model       = managerDB.category;


/* Custom */
var baseRouter = '/product/category';


var url = {
    base    : baseRouter,
    list    : baseRouter + '/list',
    data    : baseRouter + '/list/data',
    create  : baseRouter + '/create',
    save    : baseRouter + '/create/save',
    delete  : baseRouter + '/delete',

    ban     : baseRouter + '/ban',
    category : baseRouter + '/category',
    categorySave : baseRouter + '/category/save',
    categoryData : baseRouter + '/category.json',
    categoryDel : baseRouter + '/category/delete',
};

var layout  = {
    list    : 'layout/crud/list',
    create  : 'layout/crud/create'
};
var template = {
    layout : 'layout/home',

    list    : 'pages/product/category/list',
    create  : 'pages/product/product/create',
    category  : 'pages/product/category/category',
}
var title = {
    list : '分类列表',
    create : '添加商品',
    category : '分类查询'
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




router.get('/category(/:id)?', function (req, res,next) {
    temp.title = title.category;
    temp.type = 'category';
    temp.url = {
        post :url.categorySave,
        direct : url.category,
        load : url.categoryData,
        self : url.category,
        del : url.categoryDel
    };

    var id = req.param('id');
    if (id) {
        model.findById(id, function (err, data) {
            if (data) {
                temp.model = data;

                res.render(template.category, {
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
        res.render(template.category, {
            temp : temp,
            url : url,
            layout : template.layout
        })
    }

})

router.post('/category.json', function (req, res) {
    var rtn = new Object({top : new Array()});
    model.find({}, function (err, data) {
        if (data) {
            for(var i in data){
                var id = data[i]._id;
                if (data[i].catType > 0) {
                    type = data[i].catType;
                    catName = 'cat' + type;
                    id = data[i][catName];

                } else {
                    id = 'top';
                }
                if (typeof rtn[id] == 'undefined') {
                    rtn[id] = new Array();
                }
                // rtn[id][i] = data[i];
                rtn[id].push(data[i]);
            }
            res.json(common.json(true,'OK',rtn));
        } else {
            res.json(common.json(false, 'no more'));
        }
    })

})
router.post('/category/save', function (req, res) {
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

router.post('/category/delete', function (req, res) {
    var id = req.body.id;
    
    model.findById(id).then(function (json) {
        
    })
})


router.get('/import', function (req, res) {
    
})

router.post('/import/save', function (req, res) {

})

module.exports = router;