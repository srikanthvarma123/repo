import moment from 'moment';

// Env
let REACT_APP_LOGS_API_URL_West = 'https://apiwest.aims360.rest';
let REACT_APP_LOGS_API_URL_EAST = 'https://apieast.aims360.rest';

let REACT_APP_LOGS_API_RESPONSE_ENDPOINT = '/exceptionmanagement/odata/v1/log-response';
let REACT_APP_LOGS_API_EXCEPTION_ENDPOINT = '/exceptionmanagement/odata/v1/log-exception';
let REACT_APP_LOGS_API_REQUESTS_ENDPOINT = '/exceptionmanagement/odata/v1/log-request';

// Common Functions
const deBounce = (func, timeOut = 700) => {
  // just create's a slight delay of {timeOut} before executing {func}
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeOut);
  }
}
// Alternative to Switch
const switchFnc = (obj, dflt = '_default') => (args, prop) => (obj[prop](args) || obj[dflt])(args); // Returns Output of the switch function
const switchDt  = (obj, dflt = '_default') => prop => (obj[prop] || obj[dflt]); // Returns Data from the switch statement

// GLOBAL VARIABLES
const TYPE = {
  RESPONSE: 'Response',
  EXCEPTION: 'Exception',
  REQUEST: 'Request',
  ZONE: { EAST: 'East', WEST: 'West'},
  SYSTEM: { AIMS360: 'AIMS360', RUNWAY: 'Runway' } 
};
const datePickerRanges = { "Last 24 Hrs": [ new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date())], "Last 3 Days": [ new Date(new Date().setDate(new Date().getDate() - 2)), new Date(new Date())], "Last 7 Days": [ new Date(new Date().setDate(new Date().getDate() - 6)), new Date(new Date())]};
let urlObj = {
  Exception: REACT_APP_LOGS_API_EXCEPTION_ENDPOINT,
  Response: REACT_APP_LOGS_API_RESPONSE_ENDPOINT,
  Request: REACT_APP_LOGS_API_REQUESTS_ENDPOINT,
  East: REACT_APP_LOGS_API_URL_EAST,
  West: REACT_APP_LOGS_API_URL_West,
  _default: "",
};

// Create URL Helpers
const get_API_URL = (zone, type) => (params = {clientId: '', requestId: '', category: '', odataQuery: '', timestamp: { startDate: '', endDate: '' }}) => {
    // let ans = urlObj[zone] + urlObj[type] || ""; // Okay
    let ans = switchDt(urlObj)(zone) + switchDt(urlObj)(type) // Good
    if (params?.clientId) ans += `?$filter=clientId eq '${params?.clientId?.trim()}'`;
    else return '';
    if (params?.requestId) return ans + `and requestId eq '${params?.requestId?.trim()}'`;
    if (params?.category) ans += ` and category eq '${params?.category?.trim()}'`;
    if (params?.timestamp?.endDate && params?.timestamp?.startDate) ans += ` and Timestamp ge ${moment.utc(params?.timestamp?.startDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDT05:00:00.000[Z]")} and Timestamp le ${moment.utc(params?.timestamp?.endDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDT05:00:00.000[Z]")} `
    if (params?.odataQuery) ans += ' and ' + params?.odataQuery?.trim();
    return ans;
};

// useURL() Hook Helpers
const updateURL = (name, value) => {
    const updateURLParams = (name, value) => {
      //Returns baseURL + "&" + routeParam
      const urlData = new URL(window.location);
      if (value !== '') {
        let data = [];
        if (urlData.hash.includes('&')) data = urlData.hash?.substring(1)?.split('&');
        const index = data?.findIndex((ele) => ele.includes(name));
        if (index > -1) data[index] = name + '=' + value;
        else data.push(name + '=' + value);
        const baseUrl = urlData.hash.split('&')[0].replace('#', '').replace('?', "");
        if (data.length > 1) data.shift();
        return `${baseUrl}?&${data.join('&')}`;
      }
    }
    const clearURL = (key) => {
      if (key !== '') {
        const urlData = new URL(window.location);
        let data = [];
        if (urlData.hash.includes('&')) data = urlData.hash?.substring(1)?.split('&');
        const index = data?.findIndex((ele) => ele.includes(key));
        if (index > -1) data.splice(index, 1);
        const baseUrl = urlData.hash.split('&')[0].replace('#', '').replace('?', "");
        if (data.length >= 1) data.shift();
        if (data.join('&') !== '') return `${baseUrl}?&${data.join('&')}`;
        return baseUrl;
      }
    }
  if (value !== '') return updateURLParams(name, value);
  else return clearURL(name);
}
const formatGridData = (data) => data?.map((dat) => ({account: dat?.customerAccount, category: dat?.category, requestId: dat?.requestId, "Log Date & Time Local" : moment(dat?.logDateTimeLocal).format("MM/DD/YYYY hh:mm:ss A"), "Log Date & Time UTC": moment(dat?.logDateTimeUtc).format("MM/DD/YYYY hh:mm:ss A"), _cellProps: {account: {className: "nowrap"},category: {className: "nowrap"}, requestId: {className: "nowrap"}, "Log Date & Time Local": {className: "nowrap"}, "Log Date & Time UTC": {className: "nowrap"}}}) )

// useLocalStorage() Hook Helpers
const getDataFromLocalStorage = (key, value) => {
    const storedData = JSON.parse(localStorage.getItem(key)); // Get value of key form LocalStorage
    if(storedData) return storedData; // If data exists in localStorage, return it
    if(value instanceof Function) return value(); // If value is an instance of a function then call
    return value; // If no data exists for the given key just return the value
}

const reactSelectStyles = (darkMode) => ({
  option: (provided) => ({
    ...provided,
    color: darkMode ? "rgba(255, 255, 255, 0.87)" : "",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkMode ? "rgba(255, 255, 255, 0.87)" : "#5c6873",
  }),
  input: (provided) => ({
    ...provided,
    color: darkMode ? "rgba(255, 255, 255, 0.87)" : "#5c6873",
  }),
  control: (base) => ({
    ...base,
    borderColor: darkMode ? "rgba(255, 255, 255, 0.09)" : "#e4e7ea",
    background: darkMode ? "#22232e" : "",
    // maxWidth : details.id?'100px':'',
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: "",
    },
  }),
});

// for react select theme
const reactSelectTheme = (theme, darkMode) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: darkMode ? "black" : theme.colors.primary,
    primary25: darkMode ? "black" : theme.colors.primary25,
    dangerLight: darkMode ? "black" : theme.colors.dangerLight,
    neutral0: darkMode ? "#2a2b36" : theme.colors.neutral0,
  },
});

const NumberWithCommas = (value) => value ? value.toLocaleString("en-US") : 0;


export { TYPE, datePickerRanges, get_API_URL, updateURL, formatGridData, getDataFromLocalStorage, deBounce, switchFnc, switchDt, reactSelectStyles, reactSelectTheme, NumberWithCommas }
