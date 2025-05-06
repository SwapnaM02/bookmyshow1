import axios from "axios";

const token=localStorage.getItem("token");
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "authorization" : token?`Bearer ${token}`:"",
  },
  baseURL:"/",
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;