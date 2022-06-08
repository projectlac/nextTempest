import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import audit from "../../../../api/audit";
import { useAppContext } from "../../../../context/state";
import {
  CryptoOrder,
  CryptoOrderPaymentItem,
} from "../../../../types/DashboardTypes/payment";
import TablePayment from "./TablePayment";

function DataPaymentList() {
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrderPaymentItem[]>(
    []
  );
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [statusPage, setStatusPage] = useState<string>("");

  const [total, setTotal] = useState<number>(0);

  const { update } = useAppContext();

  const handleChangeLimit = (data: number) => {
    setLimitPage(data);
  };
  const handleChangePage = (data: number) => {
    setOffsetPage(data);
  };

  const handleChangeStatus = (data: string) => {
    setStatusPage(data);
  };

  useEffect(() => {
    audit
      .paymentListData({
        limit: limitPage,
        offset: offsetPage,
        status: statusPage,
      })
      .then((res) => {
        setCryptoOrders(res.data.data);
        let total = res.data.total;
        setTotal(total);
      });
  }, [update, limitPage, offsetPage, statusPage]);
  return (
    <Box mt={3}>
      <Card>
        <TablePayment
          cryptoOrders={cryptoOrders}
          handleChangeLimit={handleChangeLimit}
          handleChangePage={handleChangePage}
          total={total}
          handleChangeStatus={handleChangeStatus}
        />
      </Card>
    </Box>
  );
}

export default DataPaymentList;
