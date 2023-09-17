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
  username: string;
}
export default function Prioritize({ username }: IProps) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [prioritize, setPrioritize] = React.useState("");
  const submit = () => {
    setLoading(true);
    banner
      .changePrioritizeAccount(prioritize)
      .then((res) => {
        handleChangeMessageToast("Cập nhật thành công");
        handleChangeStatusToast();
        updated();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setPrioritize(username);
  }, [username]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrioritize(event.target.value);
  };

  return (
    <Box p={3}>
      <Box>
        <Typography>
          Ưu tiên account của User: ({username ? username : "Không ưu tiên"})
        </Typography>
        <TextField
          fullWidth
          value={prioritize}
          placeholder="Username"
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
