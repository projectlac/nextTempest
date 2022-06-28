import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import Devider from "../../../../../styles/assets/images/payment/PaymentDevider.png";
import Avatar from "../../../../../styles/assets/images/payment/avatar-cute-12.jpg";
import jwt_decode from "jwt-decode";
import DialogChangeAvatar from "../../../../Common/DialogChangeAvatar/DialogChangeAvatar";
import DialogChangePassword from "../../../../Common/DialogChangePassword/DialogChangePassword";
import audit from "../../../../../api/audit";
import avatar from "../../../../../data/avatar";

const ImageBox = styled(Box)({
  borderRadius: "50%",

  overflow: "hidden",
  "@media (min-width:0)": {
    width: "90px",
    height: "90px",
    margin: "15px auto 0",
  },
  "@media (min-width: 1024px)": {
    width: "150px",
    margin: "25px auto 0",
    height: "150px",
  },
});
const Text = styled(Box)({
  color: "#94674b",

  "& span": {
    color: "#726550",
  },
  "@media (min-width:0)": {
    fontSize: "13px",
    margin: "9px",
    textAlign: "left",
  },
  "@media (min-width: 1024px)": {
    fontSize: "16px",
    margin: "15px",
  },
});

const ButtonCustom = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "2px solid #DAB88F",
  color: "#94674b",
  margin: "15px auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "15px",
  cursor: "pointer",
  "@media (min-width:0)": {
    height: "33px",
    width: "105px",
    fontSize: "13px",
    margin: " 15px 0px 15px auto",
  },
  "@media (min-width: 1024px)": {
    height: "40px",
    width: "130px",
    fontSize: "16px",
    margin: "15px auto",
  },
}));
const DashboardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F4ECE0",
  border: "1px solid #DAB88F",
  borderRadius: "30px",
  position: "relative",
  zIndex: "1",

  textAlign: "center",
  "@media (min-width:0)": {
    padding: "20px 10px",
    height: "auto",
  },
  "@media (min-width: 1024px)": {
    padding: "40px",
    height: "550px",
  },
}));
function SelectedMenuSecond() {
  const token = localStorage.getItem("access_token");

  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [avatarCurrency, setAvatarCurrency] = React.useState<number>(0);

  const avatarTemp = localStorage.getItem("avatar");

  React.useEffect(() => {
    if (Boolean(avatarTemp)) {
      setAvatarCurrency(+avatarTemp);
    } else {
      audit.getProfile().then((res) => {
        if (res.data.avatar) {
          localStorage.setItem("avatar", res.data.avatar);
          setAvatarCurrency(res.data.avatar);
        }
      });
    }
  }, [avatarCurrency, avatarTemp]);

  const convertIDtoIndex = (id: number) => {
    return avatar.indexOf(avatar.filter((d) => d.id === id)[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenPassword = () => {
    setPassword(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePassword = () => {
    setPassword(false);
  };
  const decodeName = () => {
    if (Boolean(token)) return jwt_decode<any>(token).username;
    return "";
  };

  const decodeEmail = () => {
    if (Boolean(token)) return jwt_decode<any>(token).email;
    return "";
  };

  return (
    <DashboardBox>
      <Typography
        color="#726550"
        sx={{
          fontSize: {
            md: 28,
            xs: 20,
          },
        }}
      >
        Thông tin tài khoản
      </Typography>
      <Image src={Devider} alt="devider" width={440} height={14} />
      {avatar[convertIDtoIndex(avatarCurrency)] &&
        avatar[convertIDtoIndex(avatarCurrency)].url && (
          <Box textAlign={"center"}>
            <ImageBox>
              <Image
                src={avatar[convertIDtoIndex(avatarCurrency)].url}
                width={150}
                height={150}
                alt="crys"
              />
            </ImageBox>
            <ButtonCustom
              sx={{ margin: "0 auto !important" }}
              onClick={handleClickOpen}
            >
              Đổi avatar
            </ButtonCustom>
            <DialogChangeAvatar
              handleClose={handleClose}
              open={open}
              avatarCurrency={avatar[convertIDtoIndex(avatarCurrency)].url}
            />
          </Box>
        )}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: { md: "calc(100% - 150px)", xs: "calc(100% - 100px)" },
            justifyContent: "space-around",
          }}
        >
          <Text color="#726550">
            <span> Tên người dùng:</span> {decodeName()}
          </Text>
          <Text color="#726550">
            <span> Email liên kết:</span> {decodeEmail()}
          </Text>
          <Text color="#726550">
            <span>Đổi mật khẩu</span>
          </Text>
          <DialogChangePassword
            handleClose={handleClosePassword}
            open={password}
          />
        </Box>
        <Box
          sx={{
            width: { md: " 150px", xs: " 100px" },
          }}
        >
          <ButtonCustom>Đã liên kết</ButtonCustom>
          <ButtonCustom>Đã liên kết</ButtonCustom>
          <ButtonCustom
            onClick={() => {
              handleClickOpenPassword();
            }}
          >
            Đổi
          </ButtonCustom>
        </Box>
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuSecond;
