getStateList();


function dismissDialog() {
    document.getElementsByClassName("popup")[0].classList.remove("active");
}  

function openPopUp() {
    document.getElementsByClassName("popup")[0].classList.add("active");
}  

function selectByPin() {
    document.getElementById("district").style.visibility = "hidden";
    document.getElementById("state").style.visibility = "hidden";
    
    document.getElementById("pincode").style.visibility = "visible";
}

function goToHome() {
    window.location.href="home";
}

function goToCovidPrediction() {
    window.location.href="covidPredictor";
}

function selectByDistrict() {
    document.getElementById("district").style.visibility = "visible";
    document.getElementById("state").style.visibility = "visible";
    
    document.getElementById("pincode").style.visibility = "hidden";
}

function getVaccineSlots() {
    var state = document.getElementById("state").value;
    var district = document.getElementById("district").value;
    var pincode = document.getElementById("pincode").value;
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate()+"-"+current_datetime.getMonth()+"-"+current_datetime.getFullYear();
    if(district.length != 0) {
        const reqVaccine = new XMLHttpRequest();
        const url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${formatted_date}`;
        reqVaccine.open("GET", url);
        reqVaccine.addEventListener("load", onLoad);
        reqVaccine.addEventListener("error", onError);
        reqVaccine.send();
    } else if(pincode.length != 0) {
        const reqVaccine = new XMLHttpRequest();
        const url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${formatted_date}`;
        reqVaccine.open("GET", url);
        reqVaccine.addEventListener("load", onLoad);
        reqVaccine.addEventListener("error", onError);
        reqVaccine.send();
    }
}

function onLoad() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);
     

    document.getElementById("availableSlots").innerHTML = 
    `
    ${parsedResponse.centers.map(function(slot) {
       return(
        `

       <div class="slot">
          <h3 class="slot-hosp-name">${slot.name}</h3>
          
          <span>${slot.sessions.map(function(session){
              return (session.available_capacity >0 ? 
              `
              <br>
              
              <button type="button" class="btn green" onclick="pageRedirect()">
                 ${session.available_capacity}
              </span>
              <br>
              <span>
                 ${session.vaccine}
                 <br>
                 Dose 1: ${session.available_capacity_dose1}
                 <br>
                 Dose 2: ${session.available_capacity_dose2}
                 <br>
                 Age ${session.min_age_limit}+
              </span>
              `:
              `
              <br>
              <button type="button" class="btn red">
                 ${session.available_capacity}
              </span>
              <br>
              <span>
                 ${session.vaccine}
                 <br>
                 Dose 1: ${session.available_capacity_dose1}
                 <br>
                 Dose 2: ${session.available_capacity_dose2}
                 <br>
                 Age ${session.min_age_limit}+
              </span>
              `)
          }).join("")}</span>
          <br>
          
       </div>
       
       
        `
       ) 
       ;
    }).join("")}
    `;

    openPopUp();

}

function onError(){
    console.log("There is an error in getting the data");
}

function getStateList() {
    const reqVaccine = new XMLHttpRequest();
    const url='https://cdn-api.co-vin.in/api/v2/admin/location/states';
    reqVaccine.open("GET", url);
    reqVaccine.addEventListener("load", updateStatesList);
    reqVaccine.addEventListener("error", onError);
    reqVaccine.send();

}

function updateStatesList() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);
    var stateList = document.getElementById('states');

    for (var i = 0; i < parsedResponse.states.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        stateList.innerHTML = stateList.innerHTML +
            '<option value="' + parsedResponse.states[i]['state_id'] + '">' + parsedResponse.states[i]['state_name'] + '</option>';
    }
}

function getDistrictList(state) { 
    const reqVaccine = new XMLHttpRequest();
    const url=`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state.value}`;
    reqVaccine.open("GET", url);
    reqVaccine.addEventListener("load", updateDistrictList);
    reqVaccine.addEventListener("error", onError);
    reqVaccine.send();
}

function updateDistrictList() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);
    var districtList = document.getElementById('districts');

    for (var i = 0; i < parsedResponse.districts.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        districtList.innerHTML = districtList.innerHTML +
            '<option value="' + parsedResponse.districts[i]['district_id'] + '">' + parsedResponse.districts[i]['district_name'] + '</option>';
    }


}

const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }

  function pageRedirect() {
    window.open("https://selfregistration.cowin.gov.in/", "Registration Cowin");
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;

  


