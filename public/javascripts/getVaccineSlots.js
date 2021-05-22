getStateList();
function getVaccineSlots() {
    var state = document.getElementById("state").value;
    var district = document.getElementById("district").value;
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate()+"-"+current_datetime.getMonth()+"-"+current_datetime.getFullYear();
    alert("Hello from "+ state +" in "+ district);
    const reqVaccine = new XMLHttpRequest();
    const url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${formatted_date}`;
    reqVaccine.open("GET", url);
    reqVaccine.addEventListener("load", onLoad);
    reqVaccine.addEventListener("error", onError);
    reqVaccine.send();
    
    
}

function onLoad() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);
     

    document.getElementById("availableSlots").innerHTML = 
    `
    ${parsedResponse.centers.map(function(slot) {
       return(
        `
       <div class="Slot">
          <h3 class="slot-hosp-name">${slot.name}</h3>
       </div>
        `
       ) 
       ;
    }).join("")}
    `;

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


