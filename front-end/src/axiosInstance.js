import axios from "axios";

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
    console.log("req interceptor", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    console.log("res interceptor", response);
    if (response.status === 403) {
      localStorage.clear();
    }
    return response;
  },
  function(error) {
    console.log("res interceptor", error);
    return Promise.reject(error);
  }
);

export default instance;
