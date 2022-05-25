import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import TableTag from "./TableTag";
function DataTag() {
  const [cryptoOrders, setCryptoOrders] = useState([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { update } = useAppContext();

  const handleChangeLimit = (data: number) => {
    setLimitPage(data);
  };
  const handleChangePage = (data: number) => {
    setOffsetPage(data);
  };

  useEffect(() => {
    tagApi.getTag("").then((res) => {
      setCryptoOrders(res.data);
      let total = res.data.length;
      setTotal(total);
      // let temp = total % limitPage;
      // if (temp === 0) {
      //   setTotal(total / limitPage);
      // } else {
      //   setTotal(Math.floor(total / limitPage) + 1);
      // }
    });
  }, [update, limitPage, offsetPage]);
  return (
    <Card>
      <TableTag
        cryptoOrders={cryptoOrders}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataTag;
