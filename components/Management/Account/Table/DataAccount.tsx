import { Box, Card, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import authApi from "../../../../api/authApi";
import { useAppContext } from "../../../../context/state";
import {
  AccountData,
  AccountDataRole,
} from "../../../../types/DashboardTypes/account";
import TableAccount from "./TableAccount";
const _ = require("lodash");

function DataAccount() {
  const [data, setData] = useState<AccountData[]>([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [roleTable, setRoleTable] = useState<AccountDataRole>("");
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

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
  const callAPI = async () => {
    authApi
      .getAll({
        limit: limitPage,
        offset: offsetPage,
        role: roleTable,
        username: search,
      })
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      });
  };
  useEffect(() => {
    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleTable, limitPage, offsetPage, update]);

  function fetchDropdownOptions(key) {
    authApi
      .getAll({
        limit: limitPage,
        offset: offsetPage,
        role: roleTable,
        username: key,
      })
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDropDown = useCallback(
    _.debounce((nextValue: string) => fetchDropdownOptions(nextValue), 1000),
    []
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceDropDown(e.target.value);
  };
  return (
    <>
      <Box mb={3}>
        <TextField
          id="outlined-basic"
          label="Tìm kiếm"
          variant="outlined"
          fullWidth
          onChange={handleChangeSearch}
        />
      </Box>
      <Card>
        <TableAccount
          cryptoOrders={data}
          handleChangeRole={handleChangeRole}
          handleChangeLimit={handleChangeLimit}
          handleChangePage={handleChangePage}
          total={total}
        />
      </Card>
    </>
  );
}

export default DataAccount;
