import {
  CircularProgress,
  Button,
  Box,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import banner from "../../../api/banner";
import { useAppContext } from "../../../context/state";

interface IProps {
  show: boolean;
}
export default function TriggerShowProduct({ show }: IProps) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const submit = () => {
    setLoading(true);
    banner
      .changeShowProduct(checked)
      .then((res) => {
        handleChangeMessageToast("Cập nhật thành công");
        handleChangeStatusToast();
        updated();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(show);
  }, [show]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box p={3}>
      <Box>
        <Typography>Ẩn hiện đã bán</Typography>
        <Switch checked={checked} onChange={handleChange} />
      </Box>
      <Button variant="contained" onClick={submit}>
        {loading ? <CircularProgress /> : "Lưu"}
      </Button>
    </Box>
  );
}
