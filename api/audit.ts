import { AuditForm, EditRoleForm, PackForm, PromiseApi } from "../types";
import { GetNews } from "../types/DashboardTypes/news";
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
  getHistory(params: GetNews): Promise<PromiseApi> {
    const url = `/history?limit=${params.limit}&offset=${params.offset}`;
    return axiosAudit.get(url);
  },
  buyPack(params: PackForm): Promise<PromiseApi> {
    const url = `/audit`;
    return axiosAudit.post(url, params);
  },
};
export default audit;
