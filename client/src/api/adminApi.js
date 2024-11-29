import axios from "axios";

export const adminApiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/admin",
  timeout: 10000,
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
