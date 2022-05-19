import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import audit from "../../../../api/audit";
import banner from "../../../../api/banner";
import { useAppContext } from "../../../../context/state";
import { CryptoOrder } from "../../../../types/DashboardTypes/payment";
import TablePayment from "./TablePayment";

function DataPayment() {
  const cryptoOrders: CryptoOrder[] = [];
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

  useEffect(() => {
    audit
      .showListPack({
        limit: limitPage,
        offset: offsetPage,
        status: statusPage,
      })
      .then((res) => {
        console.log(res.data.data);

        let total = res.data.total;
        let temp = total % limitPage;
        if (temp === 0) {
          setTotal(total / limitPage);
        } else {
          setTotal(Math.floor(total / limitPage) + 1);
        }
      });
  }, [update, limitPage, offsetPage, statusPage]);
  return (
    <Card>
      <TablePayment
        cryptoOrders={cryptoOrders}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataPayment;
