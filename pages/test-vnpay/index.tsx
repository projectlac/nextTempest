import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { number } from "yup";
import vnPay from "../../api/vnPay";

function VP() {
  const [ip, setIP] = useState("");
  const [money, setMoney] = useState<number>(0);
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");

    setIP(res.data.IPv4);
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  const handlePay = () => {
    vnPay
      .updateCoin({
        amount: money,
        bankCode: "NCB",
        orderInfo: "orderInfo",
        ipAddress: ip,
        language: "vi",
        orderType: "billpayment",
      })
      .then((res) => {
        window.open(res.data, "_blank");
      });
  };
  const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(+e.target.value);
  };
  return (
    <Box>
      <TextField
        label="Số lượng nạp"
        variant="outlined"
        onChange={changeMoney}
      />
      <button onClick={handlePay}>Nạp</button>
    </Box>
  );
}

export default VP;
