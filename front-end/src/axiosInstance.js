import axios from "axios";
import { createBrowserHistory } from "history"; // or createBrowserHistory
const history = createBrowserHistory();

const instance = axios.create({
  baseURL: `${window.apiHost}`,
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  },
  function(error) {
    console.log("req interceptor error", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    // console.log("res interceptor", response);
    if (response.status === 403) {
      localStorage.clear();
      history.push("/splash");
      //so now it IS clearing the local storage, but it's not redirecting... can i do that here?
    }
    return response;
  },
  function(error) {
    // add something here to check error type, and only clear local storage if needed
    // otherwise handle error some other way
    localStorage.clear();
    history.push("/splash");
    console.log("res interceptor error", error);
    return Promise.reject(error);
  }
);

export default instance;
