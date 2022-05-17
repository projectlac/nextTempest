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
  getNewsById(params: string): Promise<PromiseApi> {
    const url = `post-get/details/${params}`;
    return axiosClient.get(url);
  },
  editNews(params: FormData, id: string): Promise<PromiseApi> {
    const url = `post/update/${id}`;
    return axiosAuthClient.patch(url, params);
  },
  delete(id: string): Promise<PromiseApi> {
    const url = `post/delete/${id}`;
    return axiosAuthClient.delete(url);
  },
};
export default newsApi;
