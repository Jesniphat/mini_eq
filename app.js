var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var promise = require('bluebird');

var routes = require('./routes/index'); // link file from "routes/index.js"  ลิ้งจริง
var users = require('./routes/users'); // link file from "routes/users.js"

var message = require('./routes/message'); // link file from "routes/message.js"
var profile = require('./routes/profile');
var authen = require('./routes/authen');
var register = require('./routes/register');

var test = require('./routes/test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);  // map function with Variable at line 8 ลิ้งที่ต่อหลัง URL ของ web browser
app.use('/users', users); // map function with Variable at line 9
app.use('/message', message); // map function with Variable at line 10
app.use('/profile', profile);
app.use('/authen', authen);
app.use('/register', register);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler sdfs
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

permission = require("./library/permission")

module.exports = app;
