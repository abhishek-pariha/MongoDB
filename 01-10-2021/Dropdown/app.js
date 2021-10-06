var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var _handlebars = require('handlebars');

_handlebars.registerHelper("toString", function(data) {
  return data.toString();
});

var handlebarsHelpers = require('handlebars-helpers')({
  handlebars: _handlebars
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var countryRouter = require('./routes/country');
var stateRouter = require('./routes/state');
var cityRouter = require('./routes/city');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({
  defaultLayout : 'main',
  handlebars: allowInsecurePrototypeAccess(_handlebars),
  helpers:handlebarsHelpers
}))
app.set('view engine', 'handlebars');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/country',countryRouter);
app.use('/state',stateRouter);
app.use('/city',cityRouter);

//Db Connection
mongoose.connect('mongodb://Adminltedb:Adminltedb@localhost:27017/Adminltedb')
.then(() => console.log('Connection Successfully'))
.catch((err) => console.log(err))

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
