import axiosAudit from "./axiosAudit";
  
  const paymentApi = {
    getKey(bank:string): Promise<any> {
      const url = `/action-cron/${bank}`;
      return axiosAudit.post(url);
    },
    //get code amazon
    getCode(acc:string, pass:string) : Promise<any> {
      const url = `/code/find-acc`;
      return axiosAudit.get(`${url}?acc=${acc}&pass=${pass}`);
    },
  };
  export default paymentApi;
  