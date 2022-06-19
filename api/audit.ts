import {
  AuditForm,
  ChangePassword,
  EditRoleForm,
  PackForm,
  PromiseApi,
} from "../types";
import { GetNews } from "../types/DashboardTypes/news";
import {
  PackFormManagement,
  PackHistoryOfAccount,
} from "../types/DashboardTypes/packManagement";
import axiosAudit from "./axiosAudit";
import axiosClient from "./axiosClient";

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
  showListPack(params: PackFormManagement): Promise<PromiseApi> {
    const url = `/audit/all?limit=${params.limit}&offsett=${params.offset}&status=${params.status}`;
    return axiosAudit.get(url);
  },
  paymentListData(params: PackFormManagement): Promise<PromiseApi> {
    const url = `/audit/all/?limit=${params.limit}&offsett=${params.offset}&status=${params.status}&type=ACCOUNT`;
    return axiosAudit.get(url);
  },
  showHistoryOfAccount(params: PackHistoryOfAccount): Promise<PromiseApi> {
    const url = `/audit?limit=${params.limit}&offsett=${params.offset}&type=STONE`;
    return axiosAudit.get(url);
  },
  completedThisPack(id: string): Promise<PromiseApi> {
    const url = `/audit/update/${id}`;
    return axiosAudit.patch(url);
  },
  //Change profile
  changePassword(params: ChangePassword): Promise<PromiseApi> {
    const url = `auth/change-password`;
    return axiosAudit.patch(url, params);
  },
  changeAvatar(params: number): Promise<PromiseApi> {
    const url = `auth/change-avatar/${params}`;
    return axiosAudit.patch(url);
  },
  getProfile(): Promise<PromiseApi> {
    const url = `/auth/profile`;
    return axiosAudit.get(url);
  },
  getAuditById(id: string): Promise<PromiseApi> {
    const url = `/audit/${id}`;
    return axiosAudit.get(url);
  },
};
export default audit;
