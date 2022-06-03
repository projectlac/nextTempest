import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tagApi from "../../../api/tag";
import background from "../../../styles/assets/images/Background.png";
import BackBTN from "../../../styles/assets/images/Shop/BackButton.png";
import FullRimumuBG from "../../../styles/assets/images/Shop/FullRimumu.png";
import NextBTN from "../../../styles/assets/images/Shop/NextButton.png";
import PaimonSubmitBuyAccount from "../../../styles/assets/images/Shop/PaimonSubmitBuyAccount.png";
import RimumuBG from "../../../styles/assets/images/Shop/Rimumu.png";
import BackgroundShop from "../../Common/BackgroundShop/BackgroundShop";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import Finally from "./Finally";
import Guarantee from "./Guarantee";

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

const NextButton = styled(Button)(
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
          font-size: 20px; margin-left:15px;
          text-transform:capitalize; `
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
const Rimumu = styled(Box)(
  ({ theme }) => `
  background: url(${RimumuBG.src});
  width: 566px;
  height: 365px;
   position: absolute;
   z-index: 4;
   bottom: 0;
   background-size: contain;
   background-position: bottom;
   background-repeat: no-repeat;
 `
);
const FullRimumu = styled(Box)(
  ({ theme }) => `
  background: url(${FullRimumuBG.src});
  width: 566px;
  height: 689px;
   position: absolute;
   z-index: 4;
   bottom: 0;
   background-size: contain;
   background-position: bottom;
   background-repeat: no-repeat;
 `
);

const Sale = styled(Box)(
  ({ theme }) => `
  position: absolute;
  background: #BF0606;
  color:#fff;
  padding:2px 5px;
    font-family: "Montserrat";
    font-weight:bold;
 bottom:0;
      `
);
const IdProduct = styled(Box)(
  ({ theme }) => `
  position: absolute;
  background: #0A2B6D;
  color:#fff;
  padding:2px 5px;
    font-family: "Montserrat";
    font-weight:bold;
 top:0;
 right:0;
      `
);

interface SubmitBuy {
  ids: string;
  slug?: string;
}
function SubmitBuy({ ids, slug }: SubmitBuy) {
  const [step, setStep] = useState<number>(1);
  const [listAccount, setListAccount] = useState([]);
  const [hadSelected, setHadSelected] = useState<number>(0);
  const router = useRouter();
  const handleStep = (s: number) => {
    setStep(s);
  };
  const handleSelect = (data: number) => {
    setHadSelected(data);
  };
  useEffect(() => {
    if (ids) {
      tagApi
        .getAccountByListID(ids)
        .then((res) => {
          setListAccount(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [ids]);

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
  const getSale = (oldP: number, newP: number) => {
    if (oldP > newP) return `-${Math.floor(((oldP - newP) / oldP) * 100)}%`;
    return;
  };
  return (
    <ProductWrap>
      {(() => {
        switch (step) {
          case 1:
            return <PaimonSubmitBuyAccountBox></PaimonSubmitBuyAccountBox>;
          case 2:
            return <Rimumu></Rimumu>;
          default:
            return <FullRimumu></FullRimumu>;
        }
      })()}

      <Container>
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
            {(() => {
              switch (step) {
                case 1:
                  return (
                    <>
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
                            {listAccount.map((d, index) => (
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
                                      <Typography
                                        fontSize={20}
                                        color={"#2D4E96"}
                                      >
                                        {d.name}
                                      </Typography>
                                      <Link
                                        href={`/chi-tiet/${d.slug}`}
                                        passHref
                                      >
                                        <Typography color={"#D5D5D5"}>
                                          {"Xem thêm >>>"}
                                        </Typography>
                                      </Link>
                                    </Box>
                                    <Typography
                                      fontSize={30}
                                      m={3}
                                      color={"#D3A36E"}
                                    >
                                      {toMoney(d.newPrice)} VND
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      position: "relative",
                                    }}
                                  >
                                    <Image
                                      src={d.imageUrl}
                                      alt=""
                                      width={300}
                                      height={182}
                                      objectFit="cover"
                                      className="custom-img"
                                    ></Image>
                                    {getSale(d.oldPrice, d.newPrice) && (
                                      <Sale>
                                        {getSale(d.oldPrice, d.newPrice)}
                                      </Sale>
                                    )}

                                    <IdProduct>{d.code}</IdProduct>
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
                            step !== 1
                              ? setStep((pr) => pr - 1)
                              : listAccount.length === 1 &&
                                (slug === "/"
                                  ? router.push(`${slug}`)
                                  : router.push(`/chi-tiet/${slug}`));
                          }}
                        >{`< Quay lại `}</BackButton>
                        <NextButton
                          sx={{
                            "&.Mui-disabled": {
                              color: "#00000070",
                            },
                          }}
                          onClick={() => {
                            setStep((pr) => pr + 1);
                          }}
                        >{`Tiếp theo >`}</NextButton>
                      </ButtonGroup>
                    </>
                  );
                case 2:
                  return (
                    <Guarantee
                      handleStep={handleStep}
                      handleSelect={handleSelect}
                    />
                  );
                default:
                  return (
                    <Finally
                      ids={ids}
                      hadSelected={hadSelected}
                      handleStep={handleStep}
                    />
                  );
              }
            })()}
          </BackgroundShop>
        </Box>
      </Container>
    </ProductWrap>
  );
}

export default SubmitBuy;
