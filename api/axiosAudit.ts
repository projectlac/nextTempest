import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/router";

const axiosAudit = axios.create({
  baseURL: "https://159.223.74.89/",
  headers: {
    "Content-Type": "application/json",
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
    const router = useRouter();
    if (error.response.status === 401) {
      router.push(`/`);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosAudit;
