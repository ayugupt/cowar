# Cowar
<img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-261105,resizemode-1,msid-79592510/prime/pharma-and-healthcare/2021-is-all-about-vaccine-transportation-piramal-schott-kaisha-are-ready-with-sturdy-vials.jpg"/>

### Get latest updates of Covid cases in India 

##### Features- Visualised Data, Covid Predictor , Vaccine Slot Checker
This website allows users to check available slots for vaccine in their district. If any slots are not available, a user can register themselves with their email IDs and pin code, and as soon as a vaccine slot is available the user will be notified through email. The website also shows all the latest and historic covid data for India and its states. The historical data has been plotted to figure out the trends of total cases, active cases, recoveries and deaths. New covid cases are shown on a map of India for each state.

The website also features a predictor which predicts the future trends of covid cases by using linear regression model and deep learning.



### Method
The website frontend has been made using HTML, CSS and ReactJS. The backend has been made using node.js. 
For Covid-19 prediction we are using linear regression model , 
Note: Currently we have can access the Covid-19 prediction model only through the [Covid-19 Predictor Notebook](https://github.com/ayugupt/technohack2021/blob/master/covid-19%20India.ipynb) by using the below code snippets
```
lr.predict(np.array([[737630]]))  # here '737630' refers to the ordial date time of any date
```

### Setup
```
npm install && npm start
```



