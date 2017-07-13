/**
 * Created by sean-laptop on 17-5-22.
 */

var Bootstrap   = require('../../lib/Bootstrap');
var router      = require('express').Router();
var common      = Bootstrap.common;
var inc         = Bootstrap.inc;
// var config      = require('../config');
var Models      = require('../../models/customer')

var customer     = Models.customer;


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

router.get('/list', function (req, res) {
    res.render('pages/customer/list', {
        inc : inc,
        layout : 'layout/home'
    })
})

router.post('/list/data', function (req, res) {
    model.listData(customer, req, res, common);
})


module.exports = router;