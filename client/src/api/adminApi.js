import axios from "axios";

export const adminApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_USER_URL + "/admin",
  timeout: 100000,
  timeoutErrorMessage: "axios is timeout ",
});

adminApiClient.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (err) => {
    console.error("request-error>>>", err);
    return Promise.reject(err);
  }
);

adminApiClient.interceptors.response.use(
  (res) => {
    console.log("response>>>", res);
    return res;
  },
  (err) => {
    console.error("response-error>>", err);
    return Promise.reject(err);
  }
);
