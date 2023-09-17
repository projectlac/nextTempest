import { PromiseApi } from "../../types";
import axiosAuditForgetAuth from "../axiosAuditForgetAuth";

const homeApi = {
  getProfile(): Promise<PromiseApi> {
    const url = `/auth/profile`;
    return axiosAuditForgetAuth.get(url);
  },
  
};
export default homeApi;
