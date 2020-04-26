import axios from "axios";
import { history } from "./index";

const instance = axios.create({
  baseURL: `${window.apiHost}`,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  },
  function (error) {
    console.log("req interceptor error", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // console.log("res interceptor", response);
    if (response.status === 403) {
      localStorage.clear();
      history.push("/splash");
      // this works but it doesn't 'refresh' so nothign happens...
    }
    return response;
  },
  function (error) {
    // add something here to check error type, and only clear local storage if needed
    // otherwise handle error some other way
    localStorage.clear();
    history.push("/splash");
    // this works but it doesn't 'refresh' so nothign happens...
    console.log("res interceptor error", error);
    return Promise.reject(error);
  }
);

export default instance;
