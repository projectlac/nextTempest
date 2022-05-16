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
        setData(res.data);
        console.log(res.data);
      });
  }, [roleTable, limitPage, offsetPage, update]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Card>
      <TableAccount
        cryptoOrders={data}
        handleChangeRole={handleChangeRole}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
      />
    </Card>
  );
}

export default DataAccount;
