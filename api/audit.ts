import { AuditForm, PromiseApi } from "../types";
import axiosAudit from "./axiosAudit";

const audit = {
  updateCoin(params: AuditForm): Promise<PromiseApi> {
    const url = "/audit/create";
    return axiosAudit.post(url, params);
  },
};
export default audit;
