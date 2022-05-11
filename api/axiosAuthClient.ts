import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/router";

// let token = localStorage.getItem('access_token');
const axiosAuthClient = axios.create({
  baseURL: "https://shopp-acc.herokuapp.com/",
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*/*",
    accept: "*/*",
    // Authorization: `bearer ${token}`
  },
});
// Add a request interceptor
axiosAuthClient.interceptors.request.use(
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
axiosAuthClient.interceptors.response.use(
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

export default axiosAuthClient;
