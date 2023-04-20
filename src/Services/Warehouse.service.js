import axios from "axios";
import { getTokenFromLocalStorage, getZoneFromLocalStorage } from "./LocalStorageService";

function WarehouseService(token, zone) {
    
    if(!token){
        token= getTokenFromLocalStorage();
    }

    if(!zone){
        zone = getZoneFromLocalStorage();
    }

    let url ="";
    if(zone === "East"){
        url = `${process.env.REACT_APP_GET_WAREHOUSE_API_URL_East}`
    } else{
        url = `${process.env.REACT_APP_GET_WAREHOUSE_API_URL_West}`
    }

    return axios.get(url, {    
        //withCredentials: true,     
        headers: {         
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "true"
        }
    })
}

export { WarehouseService }