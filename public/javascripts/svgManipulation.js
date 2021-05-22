window.addEventListener("load", onWindowLoad);

function onWindowLoad(){
    var svgObject = document.getElementById("indiaMap").contentDocument;
    var stateSVGItems = svgObject.getElementsByTagName("path");
    console.log(stateSVGItems.length)
    
    for(var i = 0; i < stateSVGItems.length; i++){
        stateSVGItems[i].style.opacity = 0.5;
        stateSVGItems[i].style.fill = "purple";
        stateSVGItems[i].style.stroke = "#ffffff";

        stateSVGItems[i].addEventListener("mouseover", function(e){
            e.currentTarget.style.opacity = 1;
        });
        stateSVGItems[i].addEventListener("mouseout", function(e){
            e.currentTarget.style.opacity = 0.5;
        });
    }
}