import { LoginForm, PromiseApi, RegisterForm } from "../types";
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
};
export default authApi;
