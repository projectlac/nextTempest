import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Avatar from "../../../../styles/assets/images/payment/avatar-cute-12.jpg";
import BGName from "../../../../styles/assets/images/payment/BGName.png";
import coin from "../../../../styles/assets/images/payment/coin.png";
import PaimonPayment from "../../../../styles/assets/images/payment/PaimonPayment.png";
import jwt_decode from "jwt-decode";
import Crystal from "../../../../styles/assets/images/payment/Crystal.png";

import SelectedMenuFirst from "./OneSelect/SelectedMenuFirst";
import SelectedMenuThird from "./OneSelect/SelectedMenuThird";
import SelectedMenuSecond from "./OneSelect/SelectedMenuSecond";
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
const AvatarBox = styled(Box)({
  width: "125px",
  height: "125px",
  margin: "0 auto",

  position: "relative",
});
const ImageBox = styled(Box)({
  borderRadius: "50%",
  width: "125px",
  height: "125px",
  border: "6px solid #BFAE9B",
  overflow: "hidden",
  marginTop: "-80px",
});
const CrystalBox = styled(Box)({
  width: "49px",
  height: "45px",
  position: "absolute",
  bottom: "-17px",
  left: 0,
  right: 0,
  margin: "0 auto",
});
const NameBox = styled(Box)({
  width: "296px",
  height: "44px",
  background: `url(${BGName.src})`,
  position: "absolute",
  left: "-38px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  paddingTop: "7px",
});
const TextBox = styled(Typography)({
  fontSize: "17px",
  color: "#726550",
  borderBottom: "1px solid #DCD0BF",
  padding: "10px 0",
  cursor: "pointer",
  "&.active": {
    color: "#D09B5F",
  },
});
const Paimon = styled(Box)({
  position: "absolute",
  bottom: "-80px",
  left: "0",
  right: "0",
  margin: "0 auto",
});

function One() {
  const [value, setValue] = React.useState<string>("momo");
  const [selectionMenu, setSelectionMenu] = React.useState<number>(0);

  const handleValue = (data: string) => {
    setValue(data);
  };
  const token = localStorage.getItem("access_token");

  const decodeToken = () => {
    if (Boolean(token)) return jwt_decode<any>(token).username;
    return "";
  };

  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
      <Grid item md={3}>
        <DashboardBox
          sx={{
            padding: "40px 10px !important",
          }}
        >
          <AvatarBox>
            <ImageBox>
              <Image src={Avatar} width={125} height={125} alt="crys" />
            </ImageBox>
            <CrystalBox>
              <Image src={Crystal} width={49} height={45} alt="crys" />
            </CrystalBox>
          </AvatarBox>
          <Typography mt={2} color="#D09B5F" fontSize={22}>
            VIP 01
          </Typography>
          <NameBox>
            <Typography
              color={"#94674B"}
              fontSize={18}
              textTransform="capitalize"
            >
              {decodeToken()}
            </Typography>
          </NameBox>
          <Box>
            <Typography>Số tiền hiện có</Typography>
            <Box
              sx={{
                marginTop: "35px",
                height: "50px",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 100%)",
                display: "flex",
                alignItems: "center",
                borderRadius: "15px",
              }}
            >
              <Box width={55}>
                <Image src={coin} alt="slime coin" width={55} height={55} />
              </Box>
              <Box width={"calc(100% - 55px)"}>
                <Typography fontSize={20} color="#94674B">
                  10.000.000
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={2}>
            <TextBox
              className={`${selectionMenu === 0 ? "active" : ""}`}
              sx={{
                borderTop: "1px solid #DCD0BF",
              }}
              onClick={() => {
                setSelectionMenu(0);
              }}
            >
              Nạp vào ví
            </TextBox>
            <TextBox
              className={`${selectionMenu === 1 ? "active" : ""}`}
              onClick={() => {
                setSelectionMenu(1);
              }}
            >
              Thông tin tài khoản
            </TextBox>
            <TextBox
              className={`${selectionMenu === 2 ? "active" : ""}`}
              onClick={() => {
                setSelectionMenu(2);
              }}
            >
              Ưu đãi VIP
            </TextBox>
          </Box>
          <Paimon width={225} height={174}>
            <Image src={PaimonPayment} alt="Paimon" layout="responsive" />
          </Paimon>
        </DashboardBox>
      </Grid>
      <Grid item md={9}>
        {(() => {
          switch (selectionMenu) {
            case 0:
              return (
                <SelectedMenuFirst handleValue={handleValue} value={value} />
              );
              break;
            case 1:
              return <SelectedMenuSecond />;
              break;
            default:
              return <SelectedMenuThird />;
          }
        })()}
      </Grid>
    </Grid>
  );
}

export default One;
