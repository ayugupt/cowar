var req = new XMLHttpRequest();
var url = "/getCovidData";


req.open('GET', url ,true);
req.addEventListener("load", onLoad);
req.addEventListener("error", onError);

req.send();

var totalCases = 0, activeCases, recoveries, deaths;

function onLoad(){
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);

    
    let maxConf = 0;
    for(var date in parsedResponse["TT"]["dates"]){
        if("total" in parsedResponse["TT"]["dates"][date] && parsedResponse["TT"]["dates"][date]["total"]["confirmed"] > maxConf){
            maxConf = parsedResponse["TT"]["dates"][date]["total"]["confirmed"];
            if("deceased" in parsedResponse["TT"]["dates"][date]["total"]){
                deaths = parsedResponse["TT"]["dates"][date]["total"]["deceased"];
            }
            if("recovered" in parsedResponse["TT"]["dates"][date]["total"]){
                recoveries = parsedResponse["TT"]["dates"][date]["total"]["recovered"];
            }
        }
    }

    activeCases = maxConf - deaths - recoveries;
    totalCases = maxConf;

    document.getElementById("totalCasesCountry").innerHTML = totalCases;
    document.getElementById("activeCasesCountry").innerHTML = activeCases;
    document.getElementById("recoveriesCountry").innerHTML = recoveries;
    document.getElementById("deathsCountry").innerHTML = deaths;


    console.log(totalCases)
    console.log(activeCases)
    console.log(recoveries)
    console.log(deaths)


    console.log(parsedResponse)
}

function onError(){
    console.log("There is an error in getting the data");
}
