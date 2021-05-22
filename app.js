var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios').default;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { response } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function httpRequest(){
  try{
    const url = "https://api.covid19india.org/v4/min/timeseries.min.json";
    const response = await axios.get(url);
    return response.data;
    console.log(response);
  }catch(error){
    return error;
    console.error(error);
  }
}

var jsonData = {};

app.get('/', function(req, res, next){
  httpRequest().then(function(val){
    jsonData = JSON.stringify(val);
    res.sendFile(path.join(__dirname, "/public/pages/home.html"));
  })
})

app.get('/vaccine', function(req, res, next){
  res.sendFile(path.join(__dirname, "/public/pages/vaccine.html"));
})

app.get('/getCovidData', function(req, res, next){
  res.send(jsonData);
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
