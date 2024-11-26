import axios from "axios";

export const userApiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 10000,
  timeoutErrorMessage: "axios is timeout ",
});

userApiClient.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (err) => {
    console.log("req-err>>>", err);
    return Promise.reject(err);
  }
);

userApiClient.interceptors.response.use(
  (res) => {
    console.log("res>>>", res);
    return res;
  },
  (err) => {
    console.log("res-err>>", err);
    return Promise.reject(err);
  }
);