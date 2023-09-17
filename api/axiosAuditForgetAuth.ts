import axios, { AxiosRequestConfig } from "axios";
const axiosAuditForgetAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*/*",
    accept: "*/*",
  },
});

// Add a request interceptor
axiosAuditForgetAuth.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);



export default axiosAuditForgetAuth;
