import { Box, Button, Card, CardHeader, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";
import authApi from "../../../api/authApi";
import audit from "../../../api/audit";

function Profile() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };
  const submit = () => {
    setLoading(true);
    authApi
      .changeInfoUser(info)
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
    audit.getProfile().then((res) => setInfo(res.data.description));
  }, []);
  return (
    <Card>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            "& .MuiCardHeader-title": {
              fontSize: {
                md: "1.2rem",
                xs: "15px",
              },
            },
          },
        }}
        title="Thông tin liên hệ"
      />
      <Box
        sx={{
          p: 3,
          "& .MuiTextField-root": {
            marginBottom: "10px",
          },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Thông tin liên hệ"
          fullWidth
          variant="outlined"
          value={info}
          disabled={true}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={submit} disabled={loading}>
          {loading ? "Loading..." : "Lưu"}
        </Button>
      </Box>
    </Card>
  );
}

export default Profile;
