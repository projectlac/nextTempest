/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Bot from "../../../../styles/assets/images/Shop/bot.png";
import Mid from "../../../../styles/assets/images/Shop/mid.png";
import Top from "../../../../styles/assets/images/Shop/top.png";
import ButtonBG from "../../../../styles/assets/images/Shop/Button.png";
import Link from "next/link";
import { useAppContext } from "../../../../context/state";
import Authentization from "../../Authentization";
import audit from "../../../../api/audit";
import { useRouter } from "next/router";

const BGWrap = styled(Box)({
  position: "relative",
  background: `url(${Mid.src})`,
  backgroundSize: "contain",
  padding: "0px 35px 25px",
  "&:before": {
    content: "''",
    position: "absolute",
    height: "116px",
    background: `url(${Top.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",
    top: "-40px",
    left: 0,
    "@media (min-width:0)": {
      top: "-20px",
    },
    "@media (min-width: 768px)": {
      top: "-50px",
    },
    "@media (min-width: 1024px)": {
      top: "-40px",
    },
  },
  "&:after": {
    content: "''",
    position: "absolute",
    height: "85px",
    background: `url(${Bot.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",
    bottom: "-65px",
    left: 0,

    "@media (min-width:0)": {
      bottom: "-70px",
    },
    "@media (min-width: 1024px)": {
      bottom: "-65px",
    },
  },
});
const BoxBorder = styled(Box)(
  (theme) => `
   
    color: #51A8CE;
    background: #FFFFFF;
    padding: 10px;
    border-radius: 15px;
    margin-bottom:10px;
    font-size: 20px;
   
    @media (min-width: 1024px) {
      font-size: 33px;
    },
    @media (min-width: 0px) {
      font-size: 20px;

    },
`
);

const TextSpecial = styled(Typography)(
  (theme) => `
  font-family: Montserrat;
  color:#4B65A3;
  font-weight: 500;
 
  @media (min-width: 1024px) {
    font-size:20px;
  },
  @media (min-width: 0px) {
    font-size: 15px;
  },
`
);
const ButtonBuy = styled(Box)(
  (theme) => `
    background: url(${ButtonBG.src});
    width:180px;
    height: 40px;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 15px auto 0;
  
    @media (min-width: 1024px) {
      height: 56px;
      width: 250px;

    },
    // @media (min-width: 0px) {
     
    //   width: 179px;
    // },
`
);
const BgWrap = styled(Box)(
  ({ theme }) => `
      height: 100vh;
      width: 100vw;
      display: flex;
      position:fixed;
      z-index:9;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      justify-content: center;
      align-items: center;
      background: transparent;
      overflow:hidden;
      background-size: cover;    
    `
);
interface DetailProps {
  accountId: string;
  price: number;
  ar: number;
  primogems: string;
  tinhHuy: number;
  moonPack: number;
  id: string;
  slug: string;
}
function DetailPrice({
  price,
  accountId,
  ar,
  id,
  slug,
  primogems,
  tinhHuy,
  moonPack,
}: DetailProps) {
  const {
    isLogin,
    handleChangeStatusToast,
    refreshLogin,
    updated,
    update,
    handleChangeMessageToast,
  } = useAppContext();
  const [wallet, setWallet] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    if (isLogin)
      audit
        .getProfile()
        .then((res) => {
          setWallet(res.data.money);
        })
        .catch((res) => {
          handleChangeMessageToast(
            "Phiên đăng nhập đã kết thúc, vui lòng đăng nhập lại!"
          );
          handleChangeStatusToast();
          refreshLogin();
          localStorage.removeItem("access_token");
          router.push("/");
        });
  }, [update]);

  const toMoney = (price: number) => {
    return price
      .toString()
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };
  const [openAuth, setOpenAuth] = useState<boolean>(false);
  const closeAuthBox = () => {
    setOpenAuth(false);
  };

  const login = () => {
    setOpenAuth(true);
  };

  const buyAccount = () => {
    if (+price > wallet) {
      handleChangeMessageToast(
        "Bạn không đủ Smile Coin để mua tài khoản này, vui lòng nạp thêm"
      );

      handleChangeStatusToast();
      updated();
    } else {
      router.push(`/thanh-toan/${id}?redirect=${slug}`);
    }
  };
  return (
    <BGWrap>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          color={"#4B65A3"}
          sx={{
            fontSize: {
              lg: "30px",
              xs: "20px",
            },
          }}
        >
          Mã account
        </Typography>
        <BoxBorder>{accountId}</BoxBorder>

        <Typography
          color={"#4B65A3"}
          sx={{
            fontSize: {
              lg: "30px",
              xs: "20px",
            },
          }}
        >
          Giá
        </Typography>
        <BoxBorder>{toMoney(price)} VND</BoxBorder>

        <Box textAlign={"left"}>
          <TextSpecial>
            <b>Adventure Rank:</b> {ar}
          </TextSpecial>
          <TextSpecial>
            <b>Primogems:</b> {primogems}
          </TextSpecial>
          <TextSpecial>
            <b>Tinh huy:</b> {tinhHuy}
          </TextSpecial>
          {moonPack > 0 && (
            <TextSpecial>
              <b>Thẻ tháng:</b> Còn {moonPack} ngày
            </TextSpecial>
          )}
        </Box>

        {isLogin ? (
          <ButtonBuy onClick={buyAccount}> </ButtonBuy>
        ) : (
          // </Link>
          <ButtonBuy onClick={login}> </ButtonBuy>
        )}
        {openAuth && (
          <BgWrap>
            <Container>
              <Authentization closeAuthBox={closeAuthBox} />
            </Container>
          </BgWrap>
        )}
      </Box>
    </BGWrap>
  );
}

export default DetailPrice;
