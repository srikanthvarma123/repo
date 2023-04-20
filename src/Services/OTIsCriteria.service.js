import axios from "axios";
import { getTokenFromLocalStorage, getZoneFromLocalStorage } from "./LocalStorageService";

function GetReport(data, zone) {

    var payload = JSON.stringify(data);

    let token = getTokenFromLocalStorage();

    if (!zone) {
        zone = getZoneFromLocalStorage();
    }


    let url = "";
    if (zone === "East") {
        url = `${process.env.REACT_APP_RUN_REPORT_API_URL_East}`
    } else {
        url = `${process.env.REACT_APP_RUN_REPORT_API_URL_West}`
    }

    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
        }
    })
}

function GetJobStatus(zone) {
    let token = getTokenFromLocalStorage();

    if (!zone) {
        zone = getZoneFromLocalStorage();
    }

    let url = "";
    if (zone === "East") {
        url = `${process.env.REACT_APP_JOB_STATUS_East}`
    } else {
        url = `${process.env.REACT_APP_JOB_STATUS_West}`
    }   
    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
        }
    })
}

function DownloadReport(zone) {
    let token = getTokenFromLocalStorage();

    if (!zone) {
        zone = getZoneFromLocalStorage();
    }

    let url = "";
    if (zone === "East") {
        url = `${process.env.REACT_APP_DOWNLOAD_FILE_East}`
    } else {
        url = `${process.env.REACT_APP_DOWNLOAD_FILE_West}`
    }

    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
        }
    })
}

function JobCheckerService(zone) {

    let token = getTokenFromLocalStorage();

    if (!zone) {
        zone = getZoneFromLocalStorage();
    }

    let url = "";
    if (zone === "East") {
        url = `${process.env.REACT_APP_JOB_CHECKER_SERVICE_East}`
    } else {
        url = `${process.env.REACT_APP_JOB_CHECKER_SERVICE_West}`
    }

    return axios.get(url, {       
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
        }
    })
}

export { GetReport, GetJobStatus, DownloadReport, JobCheckerService } 