/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import _debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import tagApi from "../../../../../api/tag";
import { useAppContext } from "../../../../../context/state";
import TableDynamicRerollOrRandom from "./TableDynamicRerollOrRandom";
import { useRouter } from "next/router";
const _ = require("lodash");
interface AccountTable {
  name: string;
  id: string;
  updatedAt: string;
  isSold: boolean;
  username: string;
  slug: string;
}

function DataDynamicRerollOrRandom() {
  const router = useRouter();
  const param = {
    game:
      router.pathname.split("/").at(-2) === "genshin"
        ? "genshin-impact"
        : router.pathname.split("/").at(-2),
    type: router.pathname.split("/").at(-1).toUpperCase(),
  };

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
    callApi(search);
  }, [update, limitPage, offsetPage, sold]);

  const callApi = (search: string) => {
    tagApi
      .getRerollAccountForAdmin(
        param.type,
        limitPage,
        offsetPage,
        sold,
        search,
        param.game
      )
      .then((res) => {
        const data = res.data.data.map((d) => {
          const { name, updatedAt, id, isSold, username, slug } = d;
          return { name, updatedAt, id, isSold, username, slug };
        });

        setCryptoOrders(data);
        let total = res.data.total;
        setTotal(total);
      });
  };

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue: string) {
    setOffsetPage(0);
    callApi(inputValue);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debounceFn(event.target.value);
  };
  // function fetchDropdownOptions(key) {
  //   tagApi
  //     .getAccount({
  //       limit: limitPage,
  //       offset: offsetPage,
  //       character: "",
  //       server: "",
  //       weapon: "",
  //       sort: null,
  //       queryString: key,
  //       isSold: sold,
  //     })
  //     .then((res) => {
  //       const data = res.data.data.map((d) => {
  //         const { username, updatedAt, id, isSole } = d;
  //         return { username, updatedAt, id, isSole };
  //       });
  //       setCryptoOrders(data);
  //       let total = res.data.total;
  //       setTotal(total);
  //     });
  // }

  // const debounceDropDown = useCallback(
  //   _.debounce((nextValue: string) => fetchDropdownOptions(nextValue), 200),
  //   []
  // );

  // const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  //   debounceDropDown(e.target.value);
  // };

  const handleChangeSold = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSold(e.target.checked);
  };

  return (
    <Card>
      {/* <Box mb={3}>
        <TextField
          id="outlined-basic"
          label="Tìm kiếm"
          variant="outlined"
          fullWidth
          onChange={handleChangeSearch}
        />
      </Box> */}

      <Box
        mx={3}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={sold} onChange={handleChangeSold} />}
            label="Chỉ hiện đã bán"
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="text"
            onChange={handleChange}
            placeholder="Tìm kiếm username"
            sx={{
              "& input": {
                padding: "7px",
              },
            }}
          ></TextField>
        </FormGroup>
      </Box>

      <TableDynamicRerollOrRandom
        cryptoOrders={cryptoOrders}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataDynamicRerollOrRandom;
