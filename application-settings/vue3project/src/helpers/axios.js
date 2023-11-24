import axios from "axios";

// const { protocol } =  window.location;
const protocol = "https:";
const API_URL = "rits-api.s2s.ph";
const DEV_API_URL = "rits-api.s2s.ph";
// const DEV_IBAS_URL = "ibas.s2s.ph";

const LOCATION_URL = "location.s2s.ph";

export const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${protocol}//` + DEV_API_URL + `/api`
      : `${protocol}//` + API_URL + `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const LOCATION_API = axios.create({
  baseURL: `${protocol}//` + LOCATION_URL + `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const TEST_API = axios.create({
  baseURL: `http://192.168.100.7/api`,
  headers: {
    "Content-Type": "application/json",
  },
});



// //- or before a request is made
// // using Interceptors
// API.interceptors.request.use(config => {
//   config.headers.post['header1'] = 'value';
//   return config;
// });

export const buildCount = "0";
export const versionCount = "1.0";

export const APP_NAME = "RITS_CS_DASHBOARD"
