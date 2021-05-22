


window.addEventListener("load", onWindowLoad);

function onWindowLoad(){
    var svgObject = document.getElementById("indiaMap").contentDocument;
    var stateSVGItems = svgObject.getElementsByTagName("path");

    for(var i = 0; i < stateSVGItems.length; i++){
        stateSVGItems[i].style.opacity = 0.5;
        stateSVGItems[i].style.fill = "purple";
        stateSVGItems[i].style.stroke = "#ffffff";

        stateSVGItems[i].addEventListener("mouseover", function(e){
            e.currentTarget.style.opacity = 1;
            document.getElementById("mapHighlight").style.display = "block";
            document.getElementById("mapHighlight").style.top = (e.currentTarget.getBBox().y-70).toString()+"px";
            document.getElementById("mapHighlight").style.left = e.currentTarget.getBBox().x.toString()+"px";

            var nameState = e.currentTarget.id.substr(e.currentTarget.id.length-2,2);

            let first = parsedResponse[nameState]["dates"][dates[dates.length-2]]["total"]["confirmed"];
            let second = parsedResponse[nameState]["dates"][dates[dates.length-3]]["total"]["confirmed"];
            let delta = first - second;
            document.getElementById("mapHighlight").innerHTML = nameState + ": " + delta.toString() + " new cases";

            
        });
        stateSVGItems[i].addEventListener("mouseout", function(e){
            e.currentTarget.style.opacity = 0.5;
            document.getElementById("mapHighlight").style.display = "none";
        });
    }
}