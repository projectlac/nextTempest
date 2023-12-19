import {
  AuditForm,
  ChangePassword,
  EditRoleForm,
  IManagement,
  PackForm,
  PromiseApi,
} from "../types";
import { GetNews } from "../types/DashboardTypes/news";
import {
  PackFormManagement,
  PackHistoryOfAccount,
} from "../types/DashboardTypes/packManagement";
import axiosAudit from "./axiosAudit";

import axiosAuthClient from "./axiosAuthClient";
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
    return axiosAuthClient.get(url);
  },

  buyPack(params: PackForm): Promise<PromiseApi> {
    const url = `/audit`;
    return axiosAudit.post(url, params);
  },
  showListPack(params: PackFormManagement): Promise<PromiseApi> {
    const url = `/audit/all?limit=${params.limit}&offset=${params.offset}&status=${params.status}&queryString=${params.queryString}`;
    return axiosAudit.get(url);
  },
  paymentListData(params: PackFormManagement): Promise<PromiseApi> {
    const url = `/audit/all/?limit=${params.limit}&offset=${params.offset}&status=${params.status}&type=${params.type}&queryString=${params.queryString}`;
    return axiosAudit.get(url);
  },
  showHistoryOfAccount(params: PackHistoryOfAccount): Promise<PromiseApi> {
    const url = `/audit?limit=${params.limit}&offset=${params.offset}&type=STONE`;
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
  getManagement(params: IManagement): Promise<PromiseApi> {
    const url = `/management?startDate=${params.startDate}&endDate=${params.endDate}`;
    return axiosAudit.get(url);
  },
  getManagementWithUser(params: IManagement): Promise<PromiseApi> {
    const url = `/management/user`;
    return axiosAudit.post(url, {
      start: params.startDate,
      end: params.endDate,
    });
  },
  getInviteSocial(): Promise<PromiseApi> {
    const url = `/management/invite-link`;
    return axiosAudit.get(url);
  },
};
export default audit;
