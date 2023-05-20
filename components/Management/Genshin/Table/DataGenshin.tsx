/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import { NewsList } from "../../../../types/DashboardTypes/news";
import BulkActions from "./BulkActions";
import TableGenshin from "./TableGenshin";
const _ = require("lodash");
interface AccountTable {
  name: string;
  code: string;
  newPrice: number;
  updatedAt: string;
  soldAt: string | null;
  id: string;
}
function DataGenshin() {
  const [cryptoOrders, setCryptoOrders] = useState<AccountTable[]>([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sold, setSold] = useState<boolean>(false);

  const { update } = useAppContext();
  const handleChangeLimit = (data: number) => {
    setLimitPage(data);
  };
  const handleChangePage = (data: number) => {
    setOffsetPage(data);
  };

  useEffect(() => {
    tagApi
      .getAccountByAdmin({
        type: "VIP,NEW",
        limit: limitPage,
        offset: offsetPage,
        character: "",
        server: "",
        weapon: "",
        sort: null,
        queryString: "",
        isSold: sold,
        game: "genshin-impact",
      })
      .then((res) => {
        const data = res.data.data.map((d) => {
          const { newPrice, code, name, updatedAt, id, soldAt } = d;
          return { newPrice, code, name, updatedAt, id, soldAt };
        });

        setCryptoOrders(data);
        let total = res.data.total;
        setTotal(total);
      });
  }, [update, limitPage, offsetPage, sold]);

  function fetchDropdownOptions(key) {
    tagApi
      .getAccountByAdmin({
        type: "VIP,NEW",
        limit: limitPage,
        offset: offsetPage,
        character: "",
        server: "",
        weapon: "",
        sort: null,
        queryString: key,
        isSold: sold,
        game: "genshin-impact",
      })
      .then((res) => {
        const data = res.data.data.map((d) => {
          const { newPrice, code, name, updatedAt, id, soldAt } = d;
          return { newPrice, code, name, updatedAt, id, soldAt };
        });

        setCryptoOrders(data);
        let total = res.data.total;
        setTotal(total);
      });
  }

  const debounceDropDown = useCallback(
    _.debounce((nextValue: string) => fetchDropdownOptions(nextValue), 200),
    []
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceDropDown(e.target.value);
  };

  const handleChangeSold = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSold(e.target.checked);
  };
  return (
    <Card>
      <Box mb={3}>
        <TextField
          id="outlined-basic"
          label="Tìm kiếm"
          variant="outlined"
          fullWidth
          onChange={handleChangeSearch}
        />
      </Box>

      <Box
        mx={3}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={sold} onChange={handleChangeSold} />}
            label="Ưu tiên đã bán"
          />
        </FormGroup>
        <Box>
          <Typography
            sx={{
              cursor: "pointer",
            }}
          >
            <Link href={"/dashboard/genshin/reroll"} passHref>
              <i>Quản lý tài khoản Reroll</i>
            </Link>
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
            }}
          >
            <Link href={"/dashboard/genshin/random"} passHref>
              <i>Quản lý tài khoản Random</i>
            </Link>
          </Typography>
        </Box>
      </Box>

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
