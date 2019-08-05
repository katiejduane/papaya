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
    console.log("interceptor", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    console.log(response);
    if (response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("state");
      localStorage.removeItem("userId");
      localStorage.removeItem("firstName");
    }
    return response;
  },
  function(error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
