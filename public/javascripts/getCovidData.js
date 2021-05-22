var req = new XMLHttpRequest();
var url = "/getCovidData";


req.open('GET', url ,true);
req.addEventListener("load", onLoad);
req.addEventListener("error", onError);

req.send();

var parsedResponse = {};
var totalCases = 0, activeCases, recoveries, deaths;
var stateList = [];
var dates = []
var totalCasesData = [], activeCasesData = [], deathsData = [], recoveriesData = [];
var totalCasesStateData = [], activeCasesStateData = [], deathsStateData = [], recoveriesStateData = [];

function onLoad(){
    var response = this.responseText;
    parsedResponse = JSON.parse(response);

    for(var states in parsedResponse){
        stateList.push(states);
        // var optionNode = document.createElement("OPTION");
        // optionNode.nodeValue = states;
        // optionNode.innerHTML = states;
        // document.getElementById("state").appendChild(optionNode);
    }

    document.getElementById("stateName").innerHTML = stateList[0];

    let maxConfState = 0, deathsState, recoveriesState, activeCasesState;
    for(var date in parsedResponse[stateList[0]]["dates"]){
        if("total" in parsedResponse[stateList[0]]["dates"][date]){
            totalCasesStateData.push(parsedResponse[stateList[0]]["dates"][date]["total"]["confirmed"]);

            if("deceased" in parsedResponse[stateList[0]]["dates"][date]["total"]){
                deathsStateData.push(parsedResponse[stateList[0]]["dates"][date]["total"]["deceased"]);
            }else{
                deathsStateData.push(0);
            }

            if("recovered" in parsedResponse[stateList[0]]["dates"][date]["total"]){
                recoveriesStateData.push(parsedResponse[stateList[0]]["dates"][date]["total"]["recovered"]);
            }else{
                recoveriesStateData.push(0);
            }

            activeCasesStateData.push(totalCasesStateData[totalCasesStateData.length-1]-recoveriesStateData[recoveriesStateData.length-1]-deathsStateData[deathsStateData.length-1]);

            if(parsedResponse[stateList[0]]["dates"][date]["total"]["confirmed"] >= maxConfState){
                maxConfState = parsedResponse[stateList[0]]["dates"][date]["total"]["confirmed"];
                if("deceased" in parsedResponse[stateList[0]]["dates"][date]["total"]){
                    deathsState = parsedResponse[stateList[0]]["dates"][date]["total"]["deceased"];
                }
                if("recovered" in parsedResponse[stateList[0]]["dates"][date]["total"]){
                    recoveriesState = parsedResponse[stateList[0]]["dates"][date]["total"]["recovered"];
                }
            }
        }
    }
    activeCasesState = maxConfState-recoveriesState-deathsState;
    document.getElementById("totalCasesState").innerHTML = maxConfState; 
    document.getElementById("activeCasesState").innerHTML = activeCasesState; 
    document.getElementById("recoveriesState").innerHTML = recoveriesState; 
    document.getElementById("deathsState").innerHTML = deathsState; 
    
    let maxConf = 0;
    for(var date in parsedResponse["TT"]["dates"]){
        dates.push(date);
        if("total" in parsedResponse["TT"]["dates"][date]){
            totalCasesData.push(parsedResponse["TT"]["dates"][date]["total"]["confirmed"]);
            
            if("deceased" in parsedResponse["TT"]["dates"][date]["total"]){
                deathsData.push(parsedResponse["TT"]["dates"][date]["total"]["deceased"]);
            }else{
                deathsData.push(0);
            }

            if("recovered" in parsedResponse["TT"]["dates"][date]["total"]){
                recoveriesData.push(parsedResponse["TT"]["dates"][date]["total"]["recovered"]);
            }else{
                recoveriesData.push(0);
            }

            activeCasesData.push(totalCasesData[totalCasesData.length-1]-recoveriesData[recoveriesData.length-1]-deathsData[deathsData.length-1]);

            if(parsedResponse["TT"]["dates"][date]["total"]["confirmed"] >= maxConf){
                maxConf = parsedResponse["TT"]["dates"][date]["total"]["confirmed"];
                if("deceased" in parsedResponse["TT"]["dates"][date]["total"]){
                    deaths = parsedResponse["TT"]["dates"][date]["total"]["deceased"];
                }
                if("recovered" in parsedResponse["TT"]["dates"][date]["total"]){
                    recoveries = parsedResponse["TT"]["dates"][date]["total"]["recovered"];
                }
            }
        }
    }

    activeCases = maxConf - deaths - recoveries;
    totalCases = maxConf;

    document.getElementById("totalCasesCountry").innerHTML = totalCases;
    document.getElementById("activeCasesCountry").innerHTML = activeCases;
    document.getElementById("recoveriesCountry").innerHTML = recoveries;
    document.getElementById("deathsCountry").innerHTML = deaths;

    ReactDOM.render(<DropDownMenu names={stateList}/>, document.querySelector(".menuHolder"));

    var chartScript = document.createElement('script');
    chartScript.setAttribute('src', '../javascripts/chart.js');
    document.body.appendChild(chartScript);

    // dates.sort(function(a, b){
    //     return new Date(a) - new Date(b);
    // })


    console.log(parsedResponse)
}

function onError(){
    console.log("There is an error in getting the data");
}

function goToVaccine() {
    window.location.href="vaccine.html";
}

function goToCovidPrediction() {
    window.location.href="covidPredictor.html";
}
