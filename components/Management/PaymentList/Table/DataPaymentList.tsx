import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import audit from "../../../../api/audit";
import { useAppContext } from "../../../../context/state";
import {
  CryptoOrder,
  CryptoOrderPaymentItem,
} from "../../../../types/DashboardTypes/payment";
import TablePayment from "./TablePayment";
const _ = require("lodash");

interface IInviteProps {
  invite_type: string;
  total: string;
}

function DataPaymentList() {
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrderPaymentItem[]>(
    []
  );
  const [inviteList, setInviteList] = useState<IInviteProps[]>([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [statusPage, setStatusPage] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [openHistorySamePrice, setOpenHistorySamePrice] =
    useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

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

  const fetchInvite = useCallback(async () => {
    const res = await audit.getInviteSocial();
    setInviteList(res.data);
  }, []);
  useEffect(() => {
    audit
      .paymentListData({
        type: openHistorySamePrice ? "ACCOUNT_SAME_PRICE" : "ACCOUNT",
        limit: limitPage,
        offset: offsetPage,
        status: statusPage,
        queryString: search,
      })
      .then((res) => {
        setCryptoOrders(res.data.data);
        let total = res.data.total;
        setTotal(total);
      });
  }, [update, limitPage, offsetPage, statusPage, openHistorySamePrice]);

  function fetchDropdownOptions(key) {
    audit
      .paymentListData({
        type: openHistorySamePrice ? "ACCOUNT_SAME_PRICE" : "ACCOUNT",
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDropDown = useCallback(
    _.debounce((nextValue: string) => fetchDropdownOptions(nextValue), 1000),
    []
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceDropDown(e.target.value);
  };
  const handleChangeOpenHistorySamePrice = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.checked);

    setOpenHistorySamePrice(e.target.checked);
  };

  useEffect(() => {
    fetchInvite();
  }, [fetchInvite]);

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
      <Box mx={3}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={openHistorySamePrice}
                onChange={handleChangeOpenHistorySamePrice}
              />
            }
            label="Hiện lịch sử reroll - random"
          />
        </FormGroup>
      </Box>
      <Box sx={{ px: 2, mb: 2, display: "flex" }}>
        {inviteList.map((ivt, i) => (
          <Box key={i} sx={{ mr: 2 }}>
            {ivt.invite_type} : {ivt.total}
          </Box>
        ))}
      </Box>
      <Card>
        <TablePayment
          cryptoOrders={cryptoOrders}
          handleChangeLimit={handleChangeLimit}
          handleChangePage={handleChangePage}
          total={total}
          handleChangeStatus={handleChangeStatus}
          openHistorySamePrice={openHistorySamePrice}
        />
      </Card>
    </Box>
  );
}

export default DataPaymentList;
