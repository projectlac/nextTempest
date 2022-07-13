import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { number } from "yup";
import vnPay from "../../api/vnPay";

function VP() {
  const [ip, setIP] = useState("");
  const [bank, setBank] = useState("");
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
        bankCode: bank,
        ipAddress: ip,
      })
      .then((res) => {
        window.open(res.data, "_blank");
      });
  };
  const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(+e.target.value);
  };
  const handleChange = (event) => {
    setBank(event.target.value);
  };
  return (
    <Box>
      <TextField
        label="Số lượng nạp"
        variant="outlined"
        required
        onChange={changeMoney}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chọn ngân hàng</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bank}
          required
          label="Chọn ngân hàng"
          onChange={handleChange}
        >
          <MenuItem value="VNPAYQR"> Ngân hàng VNPAYQR </MenuItem>
          <MenuItem value="NCB"> Ngân hàng NCB </MenuItem>
          <MenuItem value="SCB"> Ngân hàng SCB </MenuItem>
          <MenuItem value="SACOMBANK"> Ngân hàng SACOMBANK </MenuItem>
          <MenuItem value="EXIMBANK"> Ngân hàng EXIMBANK </MenuItem>
          <MenuItem value="MSBANK"> Ngân hàng MSBANK </MenuItem>
          <MenuItem value="NAMABANK"> Ngân hàng NAMABANK </MenuItem>
          <MenuItem value="VISA"> Ngân hàng VISA </MenuItem>
          <MenuItem value="VNMART"> Ngân hàng VNMART </MenuItem>
          <MenuItem value="VIETINBANK"> Ngân hàng VIETINBANK </MenuItem>
          <MenuItem value="VIETCOMBANK"> Ngân hàng VIETCOMBANK </MenuItem>
          <MenuItem value="HDBANK"> Ngân hàng HDBANK </MenuItem>
          <MenuItem value="DONGABANK"> Ngân hàng Dong A </MenuItem>
          <MenuItem value="TPBANK"> Ngân hàng Tp Bank </MenuItem>
          <MenuItem value="OJB"> Ngân hàng OceanBank </MenuItem>
          <MenuItem value="BIDV"> Ngân hàng BIDV </MenuItem>
          <MenuItem value="TECHCOMBANK"> Ngân hàng Techcombank </MenuItem>
          <MenuItem value="VPBANK"> Ngân hàng VPBank </MenuItem>
          <MenuItem value="AGRIBANK"> Ngân hàng AGRIBANK </MenuItem>
          <MenuItem value="MBBANK"> Ngân hàng MBBank </MenuItem>
          <MenuItem value="ACB"> Ngân hàng ACB </MenuItem>
          <MenuItem value="OCB"> Ngân hàng OCB </MenuItem>
          <MenuItem value="SHB"> Ngân hàng SHB </MenuItem>
          <MenuItem value="IVB"> Ngân hàng IVB </MenuItem>
        </Select>
      </FormControl>
      <button onClick={handlePay}>Nạp</button>
    </Box>
  );
}

export default VP;
