function getVaccineSlots() {
    var state = document.getElementById("state").value;
    var district = document.getElementById("district").value;
    alert("Hello from "+ state +" in "+ district);

    const api_url = 
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=624&date=22-05-2021";

    getapi(api_url);  
  }



  

async function getapi(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            'authority':'cdn-api.co-vin.in',
            'method': 'GET',
            'path': '/api/v2/appointment/sessions/public/calendarByDistrict?district_id=624&date=22-05-2021',
            'scheme': 'https',
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'if-none-match': 'W/"1118f-kbEadTEib+QM3mHbs1qvFyhPOgQ"',
            'origin': 'https://www.cowin.gov.in',
            'referer': 'https://www.cowin.gov.in/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'sec-ch-ua-mobile': '?0',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
        }})
        .then(response => response.json())
        .then(data => {console.log('Success:', data);})
        .catch((error) => {console.error('Error:', error);});
    
}

// Function to define innerHTML for HTML table
function show(data) {
    
    document.getElementById("employees").innerHTML = tab;
}  