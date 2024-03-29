import styled from "@emotion/styled";
import { Box, Grid, Hidden, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import audit from "../../../../api/audit";
import avatar from "../../../../data/avatar";
import BGName from "../../../../styles/assets/images/payment/BGName.png";
import Crystal from "../../../../styles/assets/images/payment/Crystal.png";
import PaimonPayment from "../../../../styles/assets/images/payment/PaimonPayment.png";
import coin from "../../../../styles/assets/images/payment/coin.png";
import SelectedMenuFirst from "./OneSelect/SelectedMenuFirst";
import SelectedMenuSecond from "./OneSelect/SelectedMenuSecond";
import SelectedMenuThird from "./OneSelect/SelectedMenuThird";

const DashboardBox = styled(Box)(({ theme }) => ({
  height: "555px",
  width: "100%",
  backgroundColor: "#F4ECE0",
  border: "1px solid #DAB88F",
  borderRadius: "30px",
  position: "relative",
  zIndex: "1",
  padding: "40px",
  textAlign: "center",
  "@media (min-width:0)": {
    height: "300px",
    zIndex: "2",
    marginTop: "35px",
  },
  "@media (min-width:768px)": {
    zIndex: "2",
    marginTop: "75px",
  },
  "@media (min-width: 1024px)": {
    height: "555px",
    marginTop: "0",
  },
}));
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

  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  paddingTop: "7px",
  "@media (min-width:0)": {
    position: "relative",
    margin: "0 auto",
    width: "100%",
  },
  "@media (min-width:403px)": {
    position: "relative",
    margin: "0 auto",
    width: "296px",
  },
  "@media (min-width: 768px)": {
    position: "relative",
    margin: "0 auto",
  },
  "@media (min-width: 1024px)": {
    position: "absolute",
    left: "-38px",
  },
});
const TextBox = styled(Typography)({
  color: "#726550",

  cursor: "pointer",
  "&.active": {
    color: "#D09B5F",
    "@media (min-width:0)": {
      background: "#fff",
      borderRadius: "30px",
    },
    "@media (min-width: 1024px)": {
      background: "transparent",
      borderRadius: "0",
    },
  },
  "@media (min-width:0)": {
    borderBottom: "none",
    width: "25%",
    padding: "7px 0",
    fontSize: "11px",
    "&:nth-of-type(2)": {
      width: "50%",
    },
  },
  "@media (min-width: 1024px)": {
    borderBottom: "1px solid #DCD0BF",
    width: "auto",
    padding: "10px 0",
    fontSize: "17px",
    "&:nth-of-type(2)": {
      width: "auto",
    },
  },
});
const Paimon = styled(Box)({
  position: "absolute",
  bottom: "-80px",
  left: "0",
  right: "0",
  margin: "0 auto",
});

function Four() {
  const [value, setValue] = React.useState<string>("momo");
  const [selectionMenu, setSelectionMenu] = React.useState<number>(0);
  const [avatarCurrency, setAvatarCurrency] = React.useState<number>(0);
  const [moneyCurrency, setMoneyCurrency] = React.useState<number>(0);
  const [username, setUsername] = React.useState<string>("");
  const router = useRouter();

  const handleValue = (data: string) => {
    setValue(data);
  };

  const avatarTemp = localStorage.getItem("avatar");

  React.useEffect(() => {
    audit.getProfile().then((res) => {
      if (res.data) {
        setUsername(res.data.username);
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
    if (router.query.tab === "user") setSelectionMenu(0);
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
      <Grid item md={3} xs={12}>
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
          <Typography
            mt={2}
            color="#D09B5F"
            sx={{
              fontSize: {
                md: "22px",
                xs: "17px",
              },
            }}
          >
            VIP 01
          </Typography>
          <NameBox>
            <Typography
              color={"#94674B"}
              sx={{
                fontSize: {
                  md: 18,
                  sm: 17,
                  xs: 15,
                },
              }}
              textTransform="capitalize"
            >
              {username}
            </Typography>
          </NameBox>
          <Box>
            <Hidden mdDown>
              <Typography>Số tiền hiện có</Typography>
            </Hidden>
            <Box
              sx={{
                marginTop: {
                  md: "35px",
                  xs: "10px",
                },
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
          <Box
            mt={2}
            sx={{
              display: {
                md: "block",
                xs: "flex",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextBox
              className={`${selectionMenu === 0 ? "active" : ""}`}
              onClick={() => {
                setSelectionMenu(0);
              }}
            >
              Thông tin tài khoản
            </TextBox>
            <TextBox
              className={`${selectionMenu === 1 ? "active" : ""}`}
              onClick={() => {
                setSelectionMenu(1);
              }}
            >
              Ưu đãi VIP
            </TextBox>
          </Box>
          <Hidden mdDown>
            <Paimon width={225} height={174}>
              <Image src={PaimonPayment} alt="Paimon" layout="responsive" />
            </Paimon>
          </Hidden>
        </DashboardBox>
      </Grid>
      <Grid
        item
        md={9}
        xs={12}
        sx={{
          mt: { md: 0, xs: 2 },
        }}
      >
        {(() => {
          switch (selectionMenu) {
            case 0:
              return <SelectedMenuSecond />;
            default:
              return <SelectedMenuThird />;
          }
        })()}
      </Grid>
    </Grid>
  );
}

export default Four;
