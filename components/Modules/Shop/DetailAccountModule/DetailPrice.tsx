import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Bot from "../../../../styles/assets/images/Shop/bot.png";
import Mid from "../../../../styles/assets/images/Shop/mid.png";
import Top from "../../../../styles/assets/images/Shop/top.png";
import ButtonBG from "../../../../styles/assets/images/Shop/Button.png";
import Link from "next/link";

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
  },
});
const BoxBorder = styled(Box)(
  (theme) => `
font-size: 35px;
    color: #51A8CE;
    background: #FFFFFF;
    padding: 10px;
    border-radius: 15px;
    margin-bottom:10px;
`
);

const TextSpecial = styled(Typography)(
  (theme) => `
  font-family: Montserrat;
  color:#4B65A3;
  font-weight: 500;  font-size:20px;
`
);
const ButtonBuy = styled(Box)(
  (theme) => `
    background: url(${ButtonBG.src});
    width: 250px;
    height: 56px;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 15px auto 0;
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
}
function DetailPrice({
  price,
  accountId,
  ar,
  id,
  primogems,
  tinhHuy,
  moonPack,
}: DetailProps) {
  console.log(primogems);

  return (
    <BGWrap>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography color={"#4B65A3"} fontSize={30}>
          Mã account
        </Typography>
        <BoxBorder>{accountId}</BoxBorder>

        <Typography color={"#4B65A3"} fontSize={30}>
          Giá
        </Typography>
        <BoxBorder>{price}</BoxBorder>
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

        <Link href={`/thanh-toan/${id}`} passHref>
          <ButtonBuy> </ButtonBuy>
        </Link>
      </Box>
    </BGWrap>
  );
}

export default DetailPrice;
