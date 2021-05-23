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
const { parse } = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function getVaccinationDetails(pin){
  try{
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate()+"-"+current_datetime.getMonth()+"-"+current_datetime.getFullYear();
    const urlVaccine =`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${formatted_date}`;
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
    var parsed = JSON.parse(response.body);
    return parsed;
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

async function customerNotify(){
  if(customerForNotification.length == 0 && timer !== 0){
    clearInterval(timer);
    timer = 0;

  }
  else{
    for(var i = 0; i < customerForNotification.length; i++){
      var val = await getVaccinationDetails(customerForNotification[i].pinCode);
      if(val !== 0){
        var slotAvailable = false;
        
        var availableDoses, doses1, doses2, vaccineType;
        var bodyOfEmail = "Good news!\n\nVaccine slots are available today in:\n ";


        for(var j = 0; j < val["centers"].length; j++){
          if(val["centers"][j]["sessions"][0]["available_capacity"] > 0){
            slotAvailable = true;
            availableDoses = val["centers"][j]["sessions"][0]["available_capacity"];
            doses1 = val["centers"][j]["sessions"][0]["available_capacity_dose1"];
            doses2 = val["centers"][j]["sessions"][0]["available_capacity_dose2"];
            vaccineType = val["centers"][j]["sessions"][0]["vaccine"];
            
            bodyOfEmail = bodyOfEmail + val["centers"][j].name + "- " + availableDoses + " doses are available of " + vaccineType+"\n\n";
          }
        }
        if(slotAvailable){
          bodyOfEmail = bodyOfEmail + "Go to https://cowin.gov.in now to book your slot";
          console.log("notification sent");

          mailUpdate(customerForNotification[i].emailId, "Vaccine slots are available!", bodyOfEmail);
          customerForNotification.splice(i, 1);
          i--;
        }
      }
    }
  }
}

function keepChecking(){
  timer = setInterval(customerNotify, 5000);
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
