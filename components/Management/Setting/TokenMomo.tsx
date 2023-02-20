import {
  CircularProgress,
  Button,
  Box,
  Switch,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import banner from "../../../api/banner";
import { useAppContext } from "../../../context/state";

interface IProps {
  show: string;
}
export default function TokenMomo({ show }: IProps) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const submit = () => {
    setLoading(true);
    banner
      .changeTokenMomo(token)
      .then((res) => {
        handleChangeMessageToast("Cập nhật thành công");
        handleChangeStatusToast();
        updated();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [token, setToken] = React.useState("");

  useEffect(() => {
    setToken(show);
  }, [show]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  return (
    <Box p={3}>
      <Box>
        <Typography>Thay đổi token momo</Typography>
        <TextField
          fullWidth
          value={token}
          placeholder="Đường dẫn"
          onChange={handleChange}
          sx={{
            mb: 1,
          }}
        />
      </Box>
      <Button variant="contained" onClick={submit}>
        {loading ? <CircularProgress /> : "Lưu"}
      </Button>
    </Box>
  );
}
