import {
    AuditForm, PromiseApi
} from "../types";
import { IVNPayment } from "../types/vnpay";
import axiosAudit from "./axiosAudit";
  
  const vnPay = {
    updateCoin(params: IVNPayment): Promise<any> {
      const url = "/vn-pay";
      return axiosAudit.post(url, params);
    },
  
  };
  export default vnPay;
  