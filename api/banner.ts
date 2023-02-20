import { PromiseApi } from "../types";
import axiosAudit from "./axiosAudit";

const banner = {
  uploadBanner(params: FormData): Promise<PromiseApi> {
    const url = "/cloundinary";
    return axiosAudit.post(url, params);
  },

  getBanner(): Promise<PromiseApi> {
    const url = "/cloundinary";
    return axiosAudit.get(url);
  },

  getInforHomePage(): Promise<PromiseApi> {
    const url = "/information";
    return axiosAudit.get(url);
  },
  getInforAdmin(): Promise<PromiseApi> {
    const url = "/information/get-all-by-admin";
    return axiosAudit.get(url);
  },
  updateInforHomePage(data: any): Promise<PromiseApi> {
    const url = "/information/update/e7f97af1-d398-4a13-809a-e6f3349d866a";
    return axiosAudit.put(url, data);
  },

  changeShowProduct(data: boolean): Promise<PromiseApi> {
    const url = `/information/set-show/${data}`;
    return axiosAudit.get(url);
  },
  changeTokenMomo(data: string): Promise<PromiseApi> {
    const url = `/information/update-api-bank`;
    return axiosAudit.put(url, {title:'api_momo', value:data});
  },
};
export default banner;
