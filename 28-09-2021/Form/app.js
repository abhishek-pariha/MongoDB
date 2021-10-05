var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var session = require('express-session');
var nodemailer = require('nodemailer');
var fileUpload = require('express-fileupload');
var exphbs = require('express-handlebars');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') 
var _handlebars = require('handlebars')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 600000}
}))

app.use(fileUpload());
//DB Connection Start
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://MiniProjectdb:MiniProjectdb@localhost:27017/MiniProjectdb', {useNewUrlParser: true})
.then(() => console.log('Connection Succesfully'))
.catch((err) => console.error(err))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/product',productRouter);
app.use('/category',categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
