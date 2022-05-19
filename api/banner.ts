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
};
export default banner;
