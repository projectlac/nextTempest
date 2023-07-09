import { PromiseApi } from "../types";
import axiosAudit from "./axiosAudit";

interface IBuyCode{
    slug: string;
    amount: number;
}

interface ICreateCategoryCode{
    name: string;
    price: number;
    gameSlug: string;
    image:string;
}
const codeApi = {
  

  getCodeHomePage(limit:number, offset:number): Promise<PromiseApi> {
    const url = `/gift-code-detail/get-all?limit=${limit}&offset=${offset}`;
    return axiosAudit.get(url);
  },
  getCodeAdmin(limit:number, offset:number): Promise<PromiseApi> {
    const url = `/gift-code-detail/get-all-by-admin?limit=${limit}&offset=${offset}`;
    return axiosAudit.get(url);
  },
    
  getCodeBySlugAdmin(slug:string): Promise<PromiseApi> {
    const url = `/gift-code-detail/get-one-by-admin/${slug}`;
    return axiosAudit.get(url);
  },
    getCodeCategoryBySlugAdmin(slug:string): Promise<PromiseApi> {
    const url = `/gift-code-detail/get-one/${slug}`;
    return axiosAudit.get(url);
  },
  ////////////////////////////////
  createCodeCategory(data:ICreateCategoryCode): Promise<PromiseApi> {
    const url = "/gift-code-detail/create-gift-code";
    return axiosAudit.post(url, data);
  },
  importCode(data:FormData): Promise<PromiseApi> {
    const url = "/gift-code-detail/import-detail";
    return axiosAudit.post(url, data);
  },
  /////
  updateCodeCategory(slug:string, data:ICreateCategoryCode): Promise<PromiseApi> {
    const url = `/gift-code-detail/update-gift-code/${slug}`;
    return axiosAudit.put(url, data);
  },
  updateCodeById(id:string, data:FormData): Promise<PromiseApi> {
    const url = `/gift-code-detail/update-gift-code-detail/${id}`;
    return axiosAudit.put(url, data);
  },
  ///
   deleteCodeCategory(slug:string): Promise<PromiseApi> {
    const url = `/gift-code-detail/delete-gift-code/${slug}`;
    return axiosAudit.delete(url);
  },
  deleteCodeById(id:string): Promise<PromiseApi> {
    const url = `/gift-code-detail/delete-gift-code-detail/${id}`;
    return axiosAudit.delete(url);
  },
  ///
  buyGiftCode(data:IBuyCode): Promise<PromiseApi> {
     const url = `/gift-code/buy`;
    return axiosAudit.post(url,data);
  }
};
export default codeApi;
