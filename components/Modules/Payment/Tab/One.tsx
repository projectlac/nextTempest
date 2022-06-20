import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import Image from "next/image";
import React from "react";
import avatar from "../../../../data/avatar";
import audit from "../../../../api/audit";
import BGName from "../../../../styles/assets/images/payment/BGName.png";
import coin from "../../../../styles/assets/images/payment/coin.png";
import Crystal from "../../../../styles/assets/images/payment/Crystal.png";
import PaimonPayment from "../../../../styles/assets/images/payment/PaimonPayment.png";
import SelectedMenuFirst from "./OneSelect/SelectedMenuFirst";
import SelectedMenuSecond from "./OneSelect/SelectedMenuSecond";
import SelectedMenuThird from "./OneSelect/SelectedMenuThird";
import { useRouter } from "next/router";

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
  background: "#fff",
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
  const [avatarCurrency, setAvatarCurrency] = React.useState<number>(0);
  const [moneyCurrency, setMoneyCurrency] = React.useState<number>(0);
  const router = useRouter();

  const handleValue = (data: string) => {
    setValue(data);
  };
  const token = localStorage.getItem("access_token");

  const decodeToken = () => {
    if (Boolean(token)) return jwt_decode<any>(token).username;
    return "";
  };

  const avatarTemp = localStorage.getItem("avatar");

  React.useEffect(() => {
    audit.getProfile().then((res) => {
      if (res.data) {
        setMoneyCurrency(res.data.money);
      }
    });
  }, []);

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

  React.useEffect(() => {
    if (router.query.tab === "user") setSelectionMenu(1);
  }, [router]);
  const convertIDtoIndex = (id: number) => {
    return avatar.indexOf(avatar.filter((d) => d.id === id)[0]);
  };

  const toMoney = (price: number) => {
    return price
      ? price
          .toString()
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
          })
      : 0;
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
              {avatar[convertIDtoIndex(avatarCurrency)] &&
                avatar[convertIDtoIndex(avatarCurrency)].url && (
                  <Image
                    src={avatar[convertIDtoIndex(avatarCurrency)].url}
                    width={125}
                    height={125}
                    alt="crys"
                  />
                )}
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
                <Typography fontSize={19} color="#94674B">
                  {toMoney(moneyCurrency)}
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
