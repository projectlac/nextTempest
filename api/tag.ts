import { PromiseApi } from "../types";
import { AccountForm, IBuy } from "../types/account";
import { IAddTag } from "../types/tag";
import axiosAuthClient from "./axiosAuthClient";
import axiosClient from "./axiosClient";
import axiosAudit from "./axiosAudit";

const tagApi = {
  getTag(type: string): Promise<PromiseApi> {
    const url = `/tag?type=${type}`;
    return axiosClient.get(url);
  },
  addTag(params: IAddTag): Promise<PromiseApi> {
    const url = `/tag/create`;
    return axiosAudit.post(url, params);
  },
  getTagById(id: string): Promise<PromiseApi> {
    const url = `/tag/${id}`;
    return axiosAudit.get(url);
  },
  updateTag(id: string, params: IAddTag): Promise<PromiseApi> {
    const url = `/tag/update/${id}`;
    const { content, ...result } = params;
    return axiosAudit.patch(url, result);
  },
  getAccount(params: AccountForm): Promise<PromiseApi> {
    const url = `/account-get?limit=${params.limit}&offset=${params.offset}&weapon=${params.weapon}&character=${params.character}&server=${params.server}&sort=${params.sort}&queryString=${params.queryString}`;
    return axiosClient.get(url);
  },
  addAccount(params: FormData): Promise<PromiseApi> {
    const url = `/account/create`;
    return axiosAuthClient.post(url, params);
  },
  deleteAccount(id: string): Promise<PromiseApi> {
    const url = `/account/${id}`;
    return axiosAuthClient.delete(url);
  },
  getAccountById(id: string): Promise<PromiseApi> {
    const url = `/account-get/details?id=${id}`;
    return axiosAuthClient.get(url);
  },
  updateAccount(id: string, params: FormData): Promise<PromiseApi> {
    const url = `/account/${id}`;
    return axiosAuthClient.patch(url, params);
  },
  getAccountBySlug(slug: string): Promise<PromiseApi> {
    const url = `/account-get/details?slug=${slug}`;
    return axiosClient.get(url);
  },
  getAccountByListID(listID: string): Promise<PromiseApi> {
    const url = `/account-get/wish-list?ids=${listID}`;
    return axiosClient.get(url);
  },
  buyAccount(params: IBuy): Promise<PromiseApi> {
    const url = `/account/buy-multi`;
    return axiosAudit.patch(url, params);
  },
};
export default tagApi;
