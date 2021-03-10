import axios from "axios";

//defaults
let AuthToken = sessionStorage.getItem("AuthToken");

if (AuthToken != null) {
  axios.defaults.headers.common["Authorization"] = AuthToken;
}

axios.defaults.timeout = 3000;

//interceptors
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
