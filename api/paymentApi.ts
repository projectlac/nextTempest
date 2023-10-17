import axiosAudit from "./axiosAudit";
import axiosClient from "./axiosClient";

const paymentApi = {
  getKey(bank: string): Promise<any> {
    const url = `/action-cron/${bank}`;
    return axiosAudit.post(url);
  },
  //get code amazon
  getCode(acc: string, pass: string): Promise<any> {
    const url = `/code/find-acc`;
    return axiosClient.get(`${url}?acc=${acc}&pass=${pass}`);
  },

  topUpWithCard(
    telco: string,
    amount: number,
    serial: string,
    code: string
  ): Promise<any> {
    return axiosAudit.post(`/top-up`, {
      telco,
      amount,
      serial,
      code,
      is_fast: 1,
    });
  },

  getHistoryOfUser(offset: number): Promise<any> {
    const url = `/account/bought-by-user`;
    return axiosAudit.get(`${url}?offset=${offset}`);
  },
};

export default paymentApi;
