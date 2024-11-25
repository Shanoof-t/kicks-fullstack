import axios from "axios";

export const USER_API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 10000,
  timeoutErrorMessage: "axios is timeout ",
});

USER_API.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (err) => {
    console.log("req-err>>>", err);
    return Promise.reject(err);
  }
);

USER_API.interceptors.response.use(
  (res) => {
    console.log("res>>>", res);
    return res;
  },
  (err) => {
    console.log("res-err>>", err);
    return Promise.reject(err);
  }
);
