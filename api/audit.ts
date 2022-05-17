import { AuditForm, EditRoleForm, PromiseApi } from "../types";
import axiosAudit from "./axiosAudit";

const audit = {
  updateCoin(params: AuditForm): Promise<PromiseApi> {
    const url = "/audit/create";
    return axiosAudit.post(url, params);
  },
  updateRole(params: EditRoleForm): Promise<PromiseApi> {
    const url = "/auth/update-role";
    return axiosAudit.patch(url, params);
  },
};
export default audit;
