import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Router from "next/router";
const axiosAudit = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*/*",
    accept: "*/*",
  },
});
// Add a request interceptor
axiosAudit.interceptors.request.use(
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
axiosAudit.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {

    
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      Router.push(`/`);
      
      setTimeout(()=>{window.location.reload()}, 1000)
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosAudit;
