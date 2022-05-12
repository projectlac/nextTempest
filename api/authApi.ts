import { LoginForm, PromiseApi, RegisterForm } from "../types";
import { GetNews } from "../types/DashboardTypes/news";
import axiosClient from "./axiosClient";

const authApi = {
  resgister(params: RegisterForm): Promise<PromiseApi> {
    const url = "/auth/sign-up";
    return axiosClient.post(url, params);
  },
  verified(params: string): Promise<PromiseApi> {
    return axiosClient.post(`/auth/sign-up/${params}`);
  },
  login(params: LoginForm): Promise<PromiseApi> {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  getAll(params: GetNews): Promise<PromiseApi> {
    const url = `hide-auth?limit=${params.limit}&offset=${params.offset}`;
    return axiosClient.get(url);
  },
};
export default authApi;
