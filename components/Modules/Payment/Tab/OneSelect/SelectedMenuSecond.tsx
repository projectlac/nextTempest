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
  width: "150px",
  height: "150px",
  margin: "25px auto 0",
  overflow: "hidden",
});
const Text = styled(Box)({
  color: "#94674b",
  margin: "15px",
  "& span": {
    color: "#726550",
  },
});

const ButtonCustom = styled(Box)(
  ({ theme }) => `
              height: 40px;
              width: 130px;
              background-color: transparent;
                border: 2px solid #DAB88F;
               color:#94674b;
               margin: 15px auto;
               display: flex;
               align-items: center;
               justify-content: center;
               border-radius: 15px;
               cursor:pointer;
            `
);
const DashboardBox = styled(Box)(
  ({ theme }) => `
              height: 555px;
              width: 100%;
              background-color: #F4ECE0;
                border: 1px solid #DAB88F;
                border-radius: 30px;
                position:relative;
                z-index: 1;
                padding: 40px;
                text-align:center;
            `
);
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
      <Typography color="#726550" fontSize={28}>
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
            <ButtonCustom onClick={handleClickOpen}>Đổi avatar</ButtonCustom>
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
          width={"calc(100% - 150px)"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
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
        <Box width={150}>
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
