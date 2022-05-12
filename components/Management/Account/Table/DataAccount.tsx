import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import authApi from "../../../../api/authApi";
import { AccountData } from "../../../../types/DashboardTypes/account";
import TableAccount from "./TableAccount";

function DataAccount() {
  const cryptoOrders: AccountData[] = [
    {
      id: "1",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "12",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "13",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "121",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "231",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "111",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "221",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "331",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "admin",
      smileCoin: "9999999",
    },
    {
      id: "136",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "mod",
      smileCoin: "9999",
    },
    {
      id: "94",
      name: "Admin",
      email: "Admin@gmail.com",
      role: "user",
      smileCoin: "999",
    },
  ];
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);

  useEffect(() => {
    authApi.getAll({ limit: limitPage, offset: offsetPage }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <Card>
      <TableAccount cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default DataAccount;
