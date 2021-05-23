function postRequest(email, district, pin){
    console.log("qewrt")
    let postReq = new XMLHttpRequest();
    postReq.open('POST', '/receiveNotifications', true);
    postReq.setRequestHeader("Content-type", "application/json")
    let d = JSON.stringify({emailId:email, district:district, pinCode:pin});
    postReq.send(d);

    postReq.addEventListener("load", onPostRequestDone);
    postReq.addEventListener("error", onPostRequestError);

}

function onPostRequestDone(){   
    //alert("Your details have been registered")
}

function onPostRequestError(err){
    //alert("There was an error, please try again")
}

postRequest("gametvgs123@gmail.com", 650, 201301);