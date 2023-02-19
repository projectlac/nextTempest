import axiosAudit from "./axiosAudit";
  
  const paymentApi = {
    getKey(bank:string): Promise<any> {
      const url = `/action-cron/${bank}`;
      return axiosAudit.post(url);
    },
   
  };
  export default paymentApi;
  