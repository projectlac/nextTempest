import { PromiseApi } from "../types";
import axiosAuthClient from "./axiosAuthClient";

const newsApi = {
  add(params: FormData): Promise<PromiseApi> {
    const url = "post/create";
    return axiosAuthClient.post(url, params);
  },
  edit(params: string): Promise<PromiseApi> {
    return axiosAuthClient.post(`/auth/sign-up/${params}`);
  },
  getAll(): Promise<PromiseApi> {
    const url = "/auth/login";
    return axiosAuthClient.get(url);
  },
};
export default newsApi;
