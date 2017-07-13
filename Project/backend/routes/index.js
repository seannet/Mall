var Bootstrap   = require('../../lib/Bootstrap');
var express   = Bootstrap.express;
var router    = express.Router();
var common    = Bootstrap.common;
var config    = Bootstrap.config;
var multer    = require('multer');



var upload  = multer({
  dest : '/uploads'
});
var url = {
    add : ''
};
/* Include Params */
var inc = {
    title   : config.name,
    user    : '',
};

router.use(function (req, res, next) {
    if (req.session)
    inc.user = req.session.user;
    inc.title = config.name;
    next();
})

/* GET home page. */
router.get('/', function(req, res) {
  // console.log(req.session.user);
  if (req.session && req.session.user) {

      inc.title = config.name + ' 首页';

      //Render:
      res.render('pages/index/index', {
          inc : inc,
          url : url,
          layout : 'layout/indexes',
      });
      return;
  } else {
    res.redirect('/manager/login');
    return;
  }
});


router.post('/upload',  upload.single('file'), function(req, res, next) {
      console.log(req.file, req.files, req.body.file, req.body);
      console.log(req.headers);
      res.send(common.json(true, 'test false', {
          'req-file' : req.file,
          'req-files' : req.files,
          'req-body-file' : req.body.file,
          'req.-body-files' : req.body,
      }));
});

router.get('/test' , function(req, res, next) {
    res.render('index/test');
})

router.post('/test/upload', function(req, res, next){
    console.log(req.files);
})

module.exports = router;


