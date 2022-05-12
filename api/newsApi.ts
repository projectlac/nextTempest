import { PromiseApi } from "../types";
import { GetNews } from "../types/DashboardTypes/news";
import axiosAuthClient from "./axiosAuthClient";
import axiosClient from "./axiosClient";

const newsApi = {
  add(params: FormData): Promise<PromiseApi> {
    const url = "post/create";
    return axiosAuthClient.post(url, params);
  },
  edit(params: string): Promise<PromiseApi> {
    return axiosAuthClient.post(`post-get/${params}`);
  },
  getAll(params: GetNews): Promise<PromiseApi> {
    const url = `post-get?limit=${params.limit}&offset=${params.offset}`;
    return axiosClient.get(url);
  },
};
export default newsApi;
