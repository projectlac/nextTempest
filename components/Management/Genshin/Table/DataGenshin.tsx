import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import { NewsList } from "../../../../types/DashboardTypes/news";
import TableGenshin from "./TableGenshin";
interface AccountTable {
  name: string;
  code: string;
  newPrice: number;
  updatedAt: string;
  id: string;
}
function DataGenshin() {
  const [cryptoOrders, setCryptoOrders] = useState<AccountTable[]>([]);
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
    tagApi
      .getAccount({
        limit: limitPage,
        offset: offsetPage,
        character: "",
        server: "",
        weapon: "",
        sort: null,
      })
      .then((res) => {
        const data = res.data.data.map((d) => {
          const { newPrice, code, name, updatedAt, id } = d;
          return { newPrice, code, name, updatedAt, id };
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
