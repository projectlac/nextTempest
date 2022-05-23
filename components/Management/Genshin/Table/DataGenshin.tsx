import { Card } from "@mui/material";
import { NewsList } from "../../../../types/DashboardTypes/news";
import TableGenshin from "./TableGenshin";
import { useEffect, useState } from "react";
import newsApi from "../../../../api/newsApi";
import { useAppContext } from "../../../../context/state";
function DataGenshin() {
  const [cryptoOrders, setCryptoOrders] = useState<NewsList[]>([]);
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
    newsApi.getAll({ limit: limitPage, offset: offsetPage }).then((res) => {
      const data = res.data.data.map((d) => {
        const { content, ...result } = d;
        return result;
      });

      setCryptoOrders(data);
      let total = res.data.total;
      setTotal(total);
    });
  }, [update, limitPage, offsetPage]);
  return (
    <Card>
      <TableGenshin
        cryptoOrders={cryptoOrders}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataGenshin;
