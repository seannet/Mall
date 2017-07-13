var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser = require('cookie-parser');
var config      = require('./config.js');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var redisSess   = require('connect-redis')(session);
// var multer  = require('multer');

// var index = require('./routes/index');
// var users = require('./routes/users');

var urlHelper       = require('./routes/routes.js');
var mongoConnection = require('./lib/mongoConnection.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../uploads')));//Uploaded;

//Session;
app.use(session({
    store   : new redisSess(config.redis),
    secret : config.session.secret,
    cookie : {maxAge : 60*1000*60*24}
}));

// //File upload Multer
// app.use(multer({
//     dest: './uploads/'
// }).single('file'));



//Url Helper;
urlHelper.setRequestUrl(app);
// app.use('/', index);
// app.use('/users', users);
// app.use('/manager', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);

  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
  }

  // respond with json
  if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');

});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
