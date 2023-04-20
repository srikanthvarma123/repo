import axios from "axios";

function LoginService(userData) {
    var payLoad = JSON.stringify({
        clientKey: "LOSAN",
        userName: userData.username,
        password: userData.password,
        grant_type: "password",
    });

    return TryLogin(payLoad);
}

function LoginService_GetClientCode(clientKey) {
    var payLoad = JSON.stringify({
        clientKey: clientKey,
        grant_type: "client_code"
    });

    return TryLogin(payLoad);
}

function LoginService_GetToken(securityCode, zone) {
    var payLoad = JSON.stringify({
        "securityCode": securityCode,
        "clientKey": "",
        "grant_type": "cookie",
        "zone": zone
        //callUrl: "http://localhost:3000/#/"
    });

    return TryLogin(payLoad, zone);
}

function TryLogin(payLoad, zone) {
    let url = "https://dev-runwayauth-west1.aims360runway.com/api/Authentication";
    let functionKey = "F2JGOK1FggbUDRIvfzVNPSZ9iXZt-94oExaInBQh8BpFAzFuxUyyRQ==";
    console.log(url , "1")
    if (zone === "East") {
        url = `${process.env.REACT_APP_LOGIN_API_URL_East}`;
        functionKey = `${process.env.REACT_APP_LOGIN_EAST_FUNCTION_KEY}`;
    } else {
        url = `${process.env.REACT_APP_LOGIN_API_URL_West}`;
        console.log(url , "2")
        functionKey = `${process.env.REACT_APP_LOGIN_WEST_FUNCTION_KEY}`;
    }
    console.log(url , "URL");
    return axios.post(url, payLoad, {
        withCredentials: true,     
        headers: {
            "x-functions-key": `${functionKey}`
        }
    })
}

function deleteConnectionId(signalRId , zone){
    let url = `${process.env.REACT_APP_SIGNALR_BASE_URL_EAST}`;
    if (zone === "East") {
        url = `${process.env.REACT_APP_SIGNALR_BASE_URL_EAST}`;
    } else {
        url = `${url}${process.env.REACT_APP_SIGNALR_BASE_URL_WEST}`;
    }
    url = `${url}${process.env.REACT_APP_SIGNALRCLIENT_DELETECONNECTION}`;

    axios.post(`${url}`,{},
    {withCredentials: true, headers : { "ConnectionId": signalRId }})
}


export { LoginService, LoginService_GetClientCode, LoginService_GetToken, deleteConnectionId }
