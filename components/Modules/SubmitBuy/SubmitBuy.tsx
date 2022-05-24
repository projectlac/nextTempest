import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import background from "../../../styles/assets/images/Background.png";
import NextBTN from "../../../styles/assets/images/Shop/NextButton.png";
import BackBTN from "../../../styles/assets/images/Shop/BackButton.png";
import Shenhe from "../../../styles/assets/images/Shop/Shenhe.png";
import PaimonSubmitBuyAccount from "../../../styles/assets/images/Shop/PaimonSubmitBuyAccount.png";

import BackgroundShop from "../../Common/BackgroundShop/BackgroundShop";

import TitleHighlight from "../../Common/Title/TitleHighlight";
import Image from "next/image";

const ProductWrap = styled(Box)(
  ({ theme }) => `
    width: 100vw;
    height:100vh;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    justify-content:center;
    position:relative;
  `
);

const BoxListAccount = styled(Box)(
  ({ theme }) => `
      display: flex;
     overflow:hidden;
      background-size: cover;
      justify-content:center;
      height:500px;
      overflow-Y:auto;
    `
);
const BoxItemAccount = styled(Box)(
  ({ theme }) => `
    width:100%;
    margin:10px 0;
    background:#fff;
    display: flex;
    align-items:center;
    padding: 0 15px;
    justify-content:center;
    min-height:200px;
      `
);
const Stepper = styled(Box)(
  ({ theme }) => `
      position:absolute;
      z-index: 1;
      width: 100%;
      left: 0;
    top: -70px;
        `
);
const BoxStep = styled(Box)(
  ({ theme }) => `
    width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
          `
);
const BorderStep = styled(Box)(
  ({ theme }) => `
     
     width: 60px;
     height: 60px;
     margin: 0 15px;
     background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
            `
);
const Step = styled(Box)({
  border: "1px solid #c9d2e6",
  width: "55px",
  height: "55px",
  padding: "5px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#c9d2e6",
  fontSize: "22px",
  "&.active": {
    background: "#c9d2e6",
    color: "#fff",
  },
});

const ButtonGroup = styled(Box)(
  ({ theme }) => `
        position:absolute;
        z-index:2;
        width: 100%;
        right: 0;
        bottom: -93px;
        display:flex;       justify-content: flex-end;  `
);

const NextButton = styled(Box)(
  ({ theme }) => `
            background: url(${NextBTN.src});
          width: 250px;
          height: 60px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 20px; margin-left:15px `
);
const BackButton = styled(Box)(
  ({ theme }) => `
  background: url(${BackBTN.src});
  width: 275px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;    `
);
const PaimonSubmitBuyAccountBox = styled(Box)(
  ({ theme }) => `
  background: url(${PaimonSubmitBuyAccount.src});
  width: 385px;
  height: 331px;
   position: absolute;
   z-index: 4;
   bottom: 0;
   background-size: contain;
   background-position: bottom;
   background-repeat: no-repeat;
 `
);
function SubmitBuy() {
  const [step, setStep] = useState<number>(1);
  return (
    <ProductWrap>
      <PaimonSubmitBuyAccountBox></PaimonSubmitBuyAccountBox>
      <Box mb={10} mt={15}>
        <TitleHighlight mb={10}>Tiến hành thanh toán</TitleHighlight>
        <BackgroundShop>
          <Stepper>
            <BoxStep>
              <BorderStep>
                <Step className={`${step === 1 ? "active" : ""}`}>1</Step>
              </BorderStep>
              <BorderStep>
                <Step className={`${step === 2 ? "active" : ""}`}>2</Step>
              </BorderStep>
              <BorderStep>
                <Step className={`${step === 3 ? "active" : ""}`}>3</Step>
              </BorderStep>
            </BoxStep>
          </Stepper>
          <Box
            sx={{
              position: "relative",
              zIndex: "2",
              padding: "0 50px",
            }}
          >
            <Typography
              sx={{
                color: "#4B66A2",
                fontSize: 20,
              }}
            >
              Account bạn đã chọn:
            </Typography>
            <BoxListAccount>
              <Grid container>
                {[...Array(3)].map((d, index) => (
                  <Grid item md={12} key={index}>
                    <BoxItemAccount>
                      <Box
                        width={`calc(100% - 300px)`}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "181px",
                        }}
                      >
                        <Box m={3}>
                          <Typography fontSize={20} color={"#2D4E96"}>
                            [Asia] AR49 - Itto, Zhongli, Jean, Diluc, Mona
                          </Typography>
                          <Typography color={"#D5D5D5"}>
                            {"Xem thêm >>>"}
                          </Typography>
                        </Box>
                        <Typography fontSize={30} m={3} color={"#D3A36E"}>
                          1.611.277 VND
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={Shenhe.src}
                          alt=""
                          width={300}
                          height={182}
                        ></Image>
                      </Box>
                    </BoxItemAccount>
                  </Grid>
                ))}
              </Grid>
            </BoxListAccount>
          </Box>
          <ButtonGroup>
            <BackButton
              onClick={() => {
                step !== 1 && setStep((pr) => pr - 1);
              }}
            >{`< Quay lại `}</BackButton>
            <NextButton
              onClick={() => {
                step !== 3 && setStep((pr) => pr + 1);
              }}
            >{`Tiếp theo >`}</NextButton>
          </ButtonGroup>
        </BackgroundShop>
      </Box>
    </ProductWrap>
  );
}

export default SubmitBuy;
