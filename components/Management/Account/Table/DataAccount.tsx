import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import authApi from "../../../../api/authApi";
import { useAppContext } from "../../../../context/state";
import {
  AccountData,
  AccountDataRole,
} from "../../../../types/DashboardTypes/account";
import TableAccount from "./TableAccount";

function DataAccount() {
  const [data, setData] = useState<AccountData[]>([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [roleTable, setRoleTable] = useState<AccountDataRole>("");
  const [total, setTotal] = useState<number>(0);

  const { update } = useAppContext();
  const handleChangeRole = (data: AccountDataRole) => {
    setRoleTable(data);
  };
  const handleChangeLimit = (data: number) => {
    setLimitPage(data);
  };
  const handleChangePage = (data: number) => {
    setOffsetPage(data);
  };
  useEffect(() => {
    authApi
      .getAll({ limit: limitPage, offset: offsetPage, role: roleTable })
      .then((res) => {
        setData(res.data.data);
        let total = res.data.total;
        let temp = total % limitPage;
        if (temp === 0) {
          setTotal(total / limitPage);
        } else {
          setTotal(Math.floor(total / limitPage) + 1);
        }
      });
  }, [roleTable, limitPage, offsetPage, update]);

  return (
    <Card>
      <TableAccount
        cryptoOrders={data}
        handleChangeRole={handleChangeRole}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataAccount;
