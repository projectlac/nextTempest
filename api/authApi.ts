import { ForgotForm, LoginForm, PromiseApi, RegisterForm } from "../types";
import { AccountTable } from "../types/DashboardTypes/account";
import axiosClient from "./axiosClient";

const authApi = {
  resgister(params: RegisterForm): Promise<PromiseApi> {
    const url = "/auth/sign-up";
    return axiosClient.post(url, params);
  },
  verified(params: string): Promise<PromiseApi> {
    return axiosClient.post(`/auth/sign-up/${params}`);
  },
  verifiedPassword(params: string): Promise<PromiseApi> {
    return axiosClient.patch(`/auth/forget-password/${params}`);
  },
  login(params: LoginForm): Promise<PromiseApi> {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  forgot(params: ForgotForm): Promise<PromiseApi> {
    const url = "/auth/forget-password";
    return axiosClient.post(url, params);
  },
  getAll(params: AccountTable): Promise<PromiseApi> {
    const url = `hide-auth/list-user?role=${params.role}&limit=${params.limit}&offset=${params.offset}`;
    return axiosClient.get(url);
  },
};
export default authApi;
