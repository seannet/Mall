var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {

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
        res.redirect('/manager/login');
    }
})

/* GET users listing. */
router.get('/ss', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
    res.render('index', {title : 'tester'});
})

router.get('/login/ch', function (req, res, next) {
    res.render('index', {title : 'tester'});
})



module.exports = router;
