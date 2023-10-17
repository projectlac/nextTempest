import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tagApi from "../../../api/tag";
import background from "../../../styles/assets/images/Shop/BG_Product_Tempest.png";
import BackBTN from "../../../styles/assets/images/Shop/BackButton.png";
import FullRimumuBG from "../../../styles/assets/images/Shop/FullRimumu.png";
import NextBTN from "../../../styles/assets/images/Shop/NextButton.png";
import PaimonSubmitBuyAccount from "../../../styles/assets/images/Shop/PaimonSubmitBuyAccount.png";
import RimumuBG from "../../../styles/assets/images/Shop/Rimumu.png";
// import BackgroundShop from "../../Common/BackgroundShop/BackgroundShop";
import BackgroundShopResponse from "../../Common/BackgroundShop/BackgroundShopResponse";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import Finally from "./Finally";
import Guarantee from "./Guarantee";

const ProductWrap = styled(Box)(
  () => `
    width: 100vw;
    height:950px;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    justify-content:center;
    position:relative;
  `
);

const BoxListAccount = styled(Box)(
  () => `
      display: flex;
      overflow:hidden;
      background-size: cover;
      justify-content:center;
      height:500px;
      overflow-Y:auto;
    `
);
const BoxItemAccount = styled(Box)(() => ({
  width: "100%",
  margin: "10px 0",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "200px",
  "@media (min-width:0)": {
    flexDirection: "column-reverse",
    padding: "15px 15px",
  },
  "@media (min-width: 768px)": {
    flexDirection: "row",
    padding: "0 15px",
  },
}));
const Stepper = styled(Box)(() => ({
  position: "absolute",
  zIndex: "1",
  width: "100%",
  left: "0",
  top: "-35px",
  "@media (min-width:0)": {
    top: "-30px",
  },
  "@media (min-width: 768px)": {
    top: "-35px",
  },
}));
const BoxStep = styled(Box)(() => ({
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  "@media (min-width:0)": {
    width: "100%",
  },
  "@media (min-width: 768px)": {
    width: "500px",
  },
}));
const BorderStep = styled(Box)(() => ({
  margin: "0 15px",
  background: "#fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media (min-width:0)": {
    width: "45px",
    height: "45px",
  },
  "@media (min-width: 768px)": {
    width: "60px",
    height: "60px",
  },
}));
const Step = styled(Box)({
  border: "1px solid #c9d2e6",

  padding: "5px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#c9d2e6",
  fontSize: "20px",
  "&.active": {
    background: "#c9d2e6",
    color: "#fff",
  },
  "@media (min-width:0)": {
    width: "41px",
    height: "41px",
  },
  "@media (min-width: 768px)": {
    width: "55px",
    height: "55px",
  },
});

const ButtonGroup = styled(Box)(
  () => `
        position:absolute;
        z-index:2;
        width: 100%;
        right: 0;
        bottom: -40px;
        display:flex;       justify-content: flex-end;  `
);

const NextButton = styled(Button)(() => ({
  background: `url(${NextBTN.src})`,
  width: "250px",
  height: "60px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  marginLeft: "15px",
  textTransform: "capitalize",
  "@media (min-width:0)": {
    fontSize: "15px",
  },
  "@media (min-width: 768px)": {
    fontSize: "20px",
  },
}));
const BackButton = styled(Box)(() => ({
  background: `url(${BackBTN.src})`,
  width: "275px",
  height: "60px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  "@media (min-width:0)": {
    fontSize: "15px",
  },
  "@media (min-width: 768px)": {
    fontSize: "20px",
  },
}));
const PaimonSubmitBuyAccountBox = styled(Box)(
  () => `
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
  () => `
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
  () => `
  background: url(${FullRimumuBG.src});
  width: 566px;
  height: 689px;
   position: absolute;
   z-index: 4;
   bottom: 0;
   background-size: contain;
   background-position: bottom;
   background-repeat: no-repeat;
   @media (min-width: 0px) {
      width: 450px;
      height: 689px;   left: -100px
    } 
      @media (min-width: 1200px) {
      width: 450px;
      height: 689px;
   
    } 
    @media (min-width: 1500) {
      width: 566px;
      height: 689px;
    } 
 `
);

const Sale = styled(Box)(
  () => `
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
  () => `
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

interface ISubmitBuy {
  ids: string;
  slug?: string;
}
function SubmitBuy({ ids, slug }: ISubmitBuy) {
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
            return (
              <Hidden mdDown>
                <PaimonSubmitBuyAccountBox></PaimonSubmitBuyAccountBox>
              </Hidden>
            );
          case 2:
            return (
              <Hidden mdDown>
                <Rimumu></Rimumu>
              </Hidden>
            );
          default:
            return (
              <Hidden mdDown>
                <FullRimumu></FullRimumu>
              </Hidden>
            );
        }
      })()}

      <Container>
        <Box mb={10} mt={15}>
          <TitleHighlight mb={10}>Tiến hành thanh toán</TitleHighlight>
          <BackgroundShopResponse sx={{ marginTop: "25px" }}>
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
                          padding: { md: "25px 50px", xs: "25px 15px" },
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
                                    sx={{
                                      width: {
                                        md: `calc(100% - 300px)`,
                                        xs: "100%",
                                      },
                                      display: "flex",
                                      flexDirection: {
                                        md: "column",
                                        xs: "row",
                                      },
                                      justifyContent: "space-between",
                                      minHeight: { md: "181px", xs: "100px" },
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        margin: { md: 3, xs: "15px 0px" },
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: { md: 20, xs: 15 },
                                        }}
                                        color={"#2D4E96"}
                                      >
                                        {d.name}
                                      </Typography>
                                      <Link
                                        href={`/chi-tiet/${d.slug}`}
                                        passHref
                                      >
                                        <Typography
                                          color={"#D5D5D5"}
                                          sx={{
                                            fontSize: { md: 16, xs: 13 },
                                          }}
                                        >
                                          {"Xem thêm >>>"}
                                        </Typography>
                                      </Link>
                                    </Box>
                                    <Typography
                                      sx={{
                                        fontSize: { md: 30, xs: 17 },
                                        margin: { md: 3, xs: 0 },
                                      }}
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
          </BackgroundShopResponse>
        </Box>
      </Container>
    </ProductWrap>
  );
}

export default SubmitBuy;
