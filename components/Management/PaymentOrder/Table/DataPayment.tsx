/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import audit from "../../../../api/audit";
import { useAppContext } from "../../../../context/state";
import { CryptoOrder } from "../../../../types/DashboardTypes/payment";
import TablePayment from "./TablePayment";
const _ = require("lodash");

function DataPayment() {
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrder[]>([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [statusPage, setStatusPage] = useState<string>("");

  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

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
      .showListPack({
        limit: limitPage,
        offset: offsetPage,
        status: statusPage,
        queryString: "",
      })
      .then((res) => {
        setCryptoOrders(res.data.data);
        let total = res.data.total;
        setTotal(total);
      });
  }, [update, limitPage, offsetPage, statusPage]);

  function fetchDropdownOptions(key) {
    audit
      .showListPack({
        limit: limitPage,
        offset: offsetPage,
        status: statusPage,
        queryString: key,
      })
      .then((res) => {
        setCryptoOrders(res.data.data);
        let total = res.data.total;
        setTotal(total);
      });
  }

  const debounceDropDown = useCallback(
    _.debounce((nextValue: string) => fetchDropdownOptions(nextValue), 1000),
    []
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceDropDown(e.target.value);
  };

  return (
    <Box mt={3}>
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

export default DataPayment;
