import { PromiseApi } from "../types";
import { AccountForm } from "../types/account";
import axiosClient from "./axiosClient";

const tagApi = {
  getTag(type: string): Promise<PromiseApi> {
    const url = `/tag?type=${type}`;
    return axiosClient.get(url);
  },
  getAccount(params: AccountForm): Promise<PromiseApi> {
    const url = `/account-get?limit=${params.limit}&offset=${params.offset}&weapon=${params.weapon}&character=${params.character}&server=${params.server}`;
    return axiosClient.get(url);
  },
};
export default tagApi;
