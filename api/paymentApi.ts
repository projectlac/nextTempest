import axiosAudit from "./axiosAudit";
  
  const paymentApi = {
    getKey(): Promise<any> {
      const url = "/action-cron";
      return axiosAudit.post(url);
    },
   
  };
  export default paymentApi;
  