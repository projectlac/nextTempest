import { PromiseApi, RegisterForm } from "../types";
import axiosClient from "./axiosClient";

const authApi = {
  resgister(params: RegisterForm): Promise<PromiseApi> {
    const url = "/auth/sign-up";
    return axiosClient.post(url, params);
  },
  verified(params: string): Promise<PromiseApi> {
    return axiosClient.post(`/auth/sign-up/${params}`);
  },
};
export default authApi;
