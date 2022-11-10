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
  updateInforHomePage(data: any): Promise<PromiseApi> {
    const url = "/information/update/b910c308-8cef-4400-86c6-9e5e13d5cfe8";
    return axiosAudit.put(url, data);
  },
};
export default banner;
