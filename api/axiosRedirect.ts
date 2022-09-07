import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Router from "next/router";
import history from "../utility/history";
const axiosRedirect = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});
// Add a request interceptor
axiosRedirect.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response && error.response.data && error.response.data.location) {
      window.location = error.response.data.location
    } else {
      return Promise.reject(error)
    }
  })

export default axiosRedirect;
