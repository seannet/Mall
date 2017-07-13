
var router      = require('express').Router();
var common      = require('../../lib/common');
var inc         = require('../../lib/inc');
var config      = require('../../config/config');
var Models      = require('../../models/center');
var center = Models.center;


// /* Include Params */
// var inc = {
//     title   : '',
//     user    : '',
// };

router.use(function (req, res, next) {

    //Session User;
    inc.user = req.session.user;

    /* Permission */
    common.permission(req, res, next, []);
})

router.get('/list', function (req, res, next) {
    res.render('center/list', {
        inc : inc
    })
})

router.post('/list/data', function (req, res, next) {
    // manager.find({}, function (err, manager) {
    //     res.send(common.json(true, 'ok', manager));
    // })
    var count;
    var condition       = req.body.search || {};
    var pagination      = req.body.pagination || {};
    var sort            = req.body.sort || {};
    pagination.page     = pagination.page || 1;
    pagination.limit    = pagination.limit || 60;
    var skip = (pagination.page - 1) * pagination.limit;
    // condition.is_admin = false;
    // condition.email ='/'+condition.email+'/i';
    center.find(condition).count(function (err, count) {
        // count = count;
        // console.log(count);

        center.find(condition)
            .sort(sort)
            .skip(skip)
            .limit(pagination.limit).exec(function (err, managers) {
                if (err) {
                    res.send(common.json(false, '', err));
                } else {
                    res.send(common.json(true, 'ok', {
                        page: pagination.page,
                        limit: pagination.limit,
                        total : count || 3,
                        lists: managers,
                    }));
                }
        })
    })
})

router.get('/add', function (req, res, next) {

    // Center = new center(req.body);
    // Center.save()
    var model = {};
    res.render('center/add', {
        inc : inc,
        model   : model
    })
})

router.get('/edit/:id', function (req, res, next) {
    if (req.params.id) {

    }
})

router.post('/add/save', function (req, res, next) {
    var model = req.body.model;
    var Center = new center(model);
    // var Center = new center({
    //     name   : model.name,
    //     sku     : model.sku,
    //     opentime : {
    //         open : model.opentime.open,
    //         close : model.opentime.close,
    //         weekly : model.opentime.weekly,
    //     },
    //     price : {
    //         year : model.price.year,
    //         season : model.price.season,
    //         month   : model.price.month,
    //         week    : model.price.week,
    //         daily   : model.price.daily
    //     },
    //     location : {
    //         address : model.location.address
    //     },
    // });

    Center.save(function(err, data) {
        console.log(err);
        if (data) {
            res.send(common.json(true, 'Ok', data));
        } else {
            res.send(common.json(false, 'Add faild'));
        }
    });
    // res.send(req.body);
})

router.post('/ban', function (req, res, next) {

})

// router.get('/')

module.exports = router;