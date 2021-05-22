class DropDownMenu extends React.Component{
    constructor(props){
        super(props)
        this.props = props;
    }

    render(){
        const items = this.props.names.map((val, index) => {
            return <MapItem name={val} key={index.toString()}/>
        })

        return (<div className="dropDownMenu">
            {items}
        </div>)
    }
}

class MapItem extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.updateStateValue = this.updateStateValue.bind(this);
    }

    updateStateValue(e){
        e.preventDefault();
        document.getElementById("stateName").innerHTML = this.props.name;
        activeCasesStateData = [], totalCasesStateData=[], deathsStateData=[], recoveriesStateData=[]
        let maxConf = 0, deaths, recoveries, activeCases;
        for(var date in parsedResponse[this.props.name]["dates"]){
            if("total" in parsedResponse[this.props.name]["dates"][date]){
                totalCasesStateData.push(parsedResponse[this.props.name]["dates"][date]["total"]["confirmed"]);
            
                if("deceased" in parsedResponse[this.props.name]["dates"][date]["total"]){
                    deathsStateData.push(parsedResponse[this.props.name]["dates"][date]["total"]["deceased"]);
                }else{
                    deathsStateData.push(0);
                }

                if("recovered" in parsedResponse[this.props.name]["dates"][date]["total"]){
                    recoveriesStateData.push(parsedResponse[this.props.name]["dates"][date]["total"]["recovered"]);
                }else{
                    recoveriesStateData.push(0);
                }

                activeCasesStateData.push(totalCasesStateData[totalCasesStateData.length-1]-recoveriesStateData[recoveriesStateData.length-1]-deathsStateData[deathsStateData.length-1]);
                if(parsedResponse[this.props.name]["dates"][date]["total"]["confirmed"] >= maxConf){
                    maxConf = parsedResponse[this.props.name]["dates"][date]["total"]["confirmed"];
                    if("deceased" in parsedResponse[this.props.name]["dates"][date]["total"]){
                        deaths = parsedResponse[this.props.name]["dates"][date]["total"]["deceased"];
                    }
                    if("recovered" in parsedResponse[this.props.name]["dates"][date]["total"]){
                        recoveries = parsedResponse[this.props.name]["dates"][date]["total"]["recovered"];
                    }
                }
            }
        }
        activeCases = maxConf-recoveries-deaths;
        document.getElementById("totalCasesState").innerHTML = maxConf; 
        document.getElementById("activeCasesState").innerHTML = activeCases; 
        document.getElementById("recoveriesState").innerHTML = recoveries; 
        document.getElementById("deathsState").innerHTML = deaths; 

        myChartState.destroy();
        myChartState = new Chart(ctxState, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Total Cases',
                    data: totalCasesStateData,
                    radius: 0,
                    borderWidth: 3,
                    borderColor: ['rgba(255, 255, 255, 0.2)'],
                },
                {
                    label: 'Active Cases',
                    data: activeCasesStateData,
                    radius: 0,
                    borderWidth: 3,
                    borderColor: ['rgba(255, 255, 0, 0.2)'],
                }, 
                {
                    label: 'Deaths',
                    data: deathsStateData,
                    radius: 0,
                    borderWidth: 3,
                    borderColor: ['rgba(255, 0, 0, 0.2)'],
                },
                {
                    label: 'Recovered',
                    data: recoveriesStateData,
                    radius: 0,
                    borderWidth: 3,
                    borderColor: ['rgba(0, 255, 0, 0.2)'],
                }
            ]
            },
            options: {
                scales: {
                    // x:{
                    //     type: 'time',
                    //     time: {
                    //         toolTipFormat: 'DD T'
                    //     }
                    // },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    render(){
        return (<div className="dropDownMenuItem">
            <a href="#" onClick={this.updateStateValue}>{this.props.name}</a>
        </div>)
    }
}

document.querySelector(".stateOption").addEventListener("click", function(e){
    e.stopPropagation();
    if(this.globalTimer2 !== "0"){
        clearInterval(this.globalTimer2);
    }
    var dropDownMenu = document.querySelector(".dropDownMenu");
    dropDownMenu.style.left = "0px";
    var animationInterval;
    this.globalTimer = animationInterval = window.setInterval(function(){
        if(parseInt(dropDownMenu.style.top, 10) > 116.67){
            dropDownMenu.style.top = (parseInt(dropDownMenu.style.top, 10)-16.67).toString()+"%";
        }else{
            dropDownMenu.style.top = "100%";
            clearInterval(animationInterval);
            this.globalTimer = "0";
        }
    }, 16.67)
})

document.querySelector(".stateOption").addEventListener("mouseleave", function(event){
    // var e = event.toElement || event.relatedTarget;
    // if(e.parentNode == this || e==this){
    //     return;
    // }
    if(this.globalTimer !== "0"){
        clearInterval(this.globalTimer);
    }
    var dropDownMenu = document.querySelector(".dropDownMenu");
    var animationInterval2;
    animationInterval2 = this.globalTimer2 = window.setInterval(function(){
        if(parseInt(dropDownMenu.style.top, 10) < 183){
            dropDownMenu.style.top = (parseInt(dropDownMenu.style.top, 10)+16.67).toString()+"%";
        }else{
            dropDownMenu.style.top = "200%";
            dropDownMenu.style.left = "101vw";
            clearInterval(animationInterval2);
            this.globalTimer2 = "0";
        }
    }, 16.67)
})
