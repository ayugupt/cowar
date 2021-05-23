var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios').default;
var got = require('got');
var https = require('https');
var nodemailer = require('nodemailer')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { response } = require('express');
const { getMaxListeners } = require('process');
const { TooManyRequests } = require('http-errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function getVaccinationDetails(district){
  try{
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate()+"-"+current_datetime.getMonth()+"-"+current_datetime.getFullYear();
    const urlVaccine =`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=650&date=23-4-2021`;
    const agent = new https.Agent({
      rejectUnauthorized: false
  });

  let response = await got.get(urlVaccine);

  //   let response = await axios.get(urlVaccine, {httpsAgent:agent, 
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': '*',
  //     'Access-Control-Allow-Credentials': true,
  //     'Access-Control-Allow-Headers': ["Content-Type", "Authorization"],
  //     'sec-fetch-mode':'cors',
  //     'sec-fetch-site':'cross-site'
  // }}); 

    return response.body;
  }catch(error){
    console.error(error);
    return 0;
  }
}

function mailUpdate(emailId, subject, body){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'technohack2021ayukar@gmail.com',
      pass: 'ie5GtWk!*t2s'
    }
  });

  let mailOptions = {
    from: 'technohack2021ayukar@gmail.com',
    to: emailId,
    subject: subject,
    text: body,
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Email sent ' + info.response);
    }
  })
}

function customerNotify(){
  if(customerForNotification.length == 0 && timer !== 0){
    clearInterval(timer);
    timer = 0;

  }
  else{
    for(var i = 0; i < customerForNotification.length; i++){
      getVaccinationDetails(customerForNotification[i].district).then(function(val){
        if(val !== 0){
          var slotAvailable = false;
          
          var centerIndex, sessionIndex, availableDoses;

          for(var j = 0; j < val["centers"].length && !slotAvailable; j++){
            for(var k = 0; k < val["centers"][i]["sessions"] && !slotAvailable; k++){
              if(val["centers"][i]["sessions"]["available_capacity"] > 0){
                slotAvailable = true;
                centerIndex = j;
                sessionIndex = k;
                availableDoses = val["centers"][i]["sessions"]["available_capacity"];
              }
            }
          }
          if(slotAvailable){
          var bodyOfEmail = "Good news!\nVaccine slots are open in " + val["centers"][centerIndex]["name"] + " for today. Only " + availableDoses + " are left."

            mailUpdate(customerForNotification[i].email, "Vaccine slots are available!", bodyOfEmail);
            customerForNotification.splice(i, 1);
            i--;
          }
        }
      })
    }
  }
}

function keepChecking(){
  timer = setInterval(customerNotify, 10000);
}

async function httpRequest(){
  try{
    const url = "https://api.covid19india.org/v4/min/timeseries.min.json";
    const response = await axios.get(url);
    jsonData = JSON.stringify(response.data);
  }catch(error){
    throw error;
  }
}

var jsonData = {};
var customerForNotification = [];
var timer = 0;

app.get('/', async function(req, res, next){
  try{
    await httpRequest();
    res.sendFile(path.join(__dirname, "/public/pages/home.html"));
  }catch(error){
    res.send("Sorry an error occured");
  }
})

app.get('/vaccine', function(req, res, next){
  res.sendFile(path.join(__dirname, "/public/pages/vaccine.html"));
})

app.get('/getCovidData', function(req, res, next){
  res.send(jsonData);
})

app.post('/receiveNotifications', function(req, res, next){
  customerForNotification.push(req.body);
  if(timer === 0){
    keepChecking();
  }
  console.log(req.body);
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
