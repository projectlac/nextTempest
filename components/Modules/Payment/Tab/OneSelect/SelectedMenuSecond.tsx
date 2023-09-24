import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import audit from "../../../../../api/audit";
import avatar from "../../../../../data/avatar";
import Devider from "../../../../../styles/assets/images/payment/PaymentDevider.png";
import DialogChangeAvatar from "../../../../Common/DialogChangeAvatar/DialogChangeAvatar";
import DialogChangePassword from "../../../../Common/DialogChangePassword/DialogChangePassword";

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
    fontSize: "12px",
    margin: "2px 0 0px",
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
    fontSize: "12px",
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
interface IUser {
  email: string;
  name: string;
}

function SelectedMenuSecond() {
  const [user, setUser] = React.useState<IUser>();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [avatarCurrency, setAvatarCurrency] = React.useState<number>(0);

  const avatarTemp = localStorage.getItem("avatar");

  const processEmail = (email: string) => {
    const reEmail = email ?? "".split("@") ?? [""];
    if (reEmail[0].length > 7) {
      return reEmail[0].slice(0, 4) + "***@" + reEmail[1];
    }
    return email;
  };

  React.useEffect(() => {
    const fetch = async () => {
      const res = await audit.getProfile();
      if (res) {
        setUser({ name: res.data.username, email: res.data.email });
        if (Boolean(avatarTemp)) {
          setAvatarCurrency(+avatarTemp);
        } else {
          localStorage.setItem("avatar", res.data.avatar);
          setAvatarCurrency(res.data.avatar);
        }
      }
    };
    fetch();
  }, [avatarTemp]);
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
            <span> Tên người dùng:</span> {user?.name}
          </Text>
          <Text color="#726550">
            <span> Email liên kết:</span> {processEmail(user?.email)}
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
