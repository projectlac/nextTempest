import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import BGPack from "../../../../styles/assets/images/payment/BGPack.png";
import dst300 from "../../../../styles/assets/images/payment/dst300.png";
import Quati from "../../../../styles/assets/images/payment/Quati.png";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Pack } from "../../../../types";
const CustomField = styled(Field)(
  ({ theme }) => `
    width: 90%;
    height:57px;
    background: #E5DED4;
    border: none;
    outline:none;
    border-radius: 20px;
    margin-bottom:10px;
    font-size: 18px;
    padding: 15px 25px;
    font-family: 'michos';
          `
);
const DashboardBox = styled(Box)(
  ({ theme }) => `
            height: 600px;
            width: 100%;
            background-color: #F4ECE0;
              border: 1px solid #DAB88F;
              border-radius: 30px;
              position:relative;
              z-index: 1;
              padding: 20px;
              text-align:center;
          `
);

const Price = styled(Box)(
  ({ theme }) => `
  width: 80%;
  margin: 0 auto;
  height: 35px;
  background: #f4ece0;
  border: solid 1px #DAB88F;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94674B;
          `
);

const Value = styled(Typography)(
  ({ theme }) => `
  position: absolute;
  top: 13px;
  left: 0;
  right: 0;
  z-index: 1;
  color: #94674B;
          `
);
const Quatily = styled(Box)(
  ({ theme }) => `
  position: absolute;
  top: -7px;
  right: -7px;
  z-index: 1;
  background:url(${Quati.src});
  color: #fff;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-repeat: no-repeat;

          `
);

enum COLOR_BORDER {
  MAIN = "#8A573E",
}
const BodyHead = styled(Box)({
  height: "45px",
  background: "#e4ddd2",
  display: "flex",

  "& > div ": {
    borderBottom: " 2px solid #f4ece0",
    borderLeft: "2px solid #f4ece0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&first-of-type": {
      borderLeft: "none",
    },
  },
});

const BoxBody = styled(Box)({
  background: "#e4ddd2",

  height: "130px",
  overflow: "hidden",
  overflowY: "auto",
});
const BodyTable = styled(Box)({
  background: "#e4ddd2",
  display: "flex",

  overflow: "hidden",
  overflowY: "auto",

  "& > div ": {
    height: "45px",
    // borderLeft: "2px solid #f4ece0",
    borderBottom: " 2px solid #f4ece0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&first-of-type": {
      borderLeft: "none",
    },
  },
});
function Two() {
  const [defauValue, setDefaultValue] = useState<Pack[]>([
    {
      name: "300ĐST",
      id: "1",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "2",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "3",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "4",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "5",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "6",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "7",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "8",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
  ]);

  const [cart, setCard] = useState<Pack[]>([]);
  const addProduct = (id: string) => {
    const tempValue = [...defauValue];
    const index = tempValue.findIndex((d) => d.id === id);

    tempValue[index].quatily++;
    setDefaultValue(tempValue);
    console.log(tempValue);

    const carTemp = [...cart];

    const indexCart = carTemp.findIndex((d) => d.id === id);

    indexCart > -1
      ? carTemp[indexCart].quatily + 1
      : carTemp.push(tempValue[index]);
    console.log(carTemp);
    setCard(carTemp);
  };

  const LoginSchema = Yup.object().shape({
    uid: Yup.string().required("*Không được để trống "),
    password: Yup.string().required("*Không được để trống "),
    account: Yup.string().required("*Không được để trống "),
    ingame: Yup.string().required("*Không được để trống "),
    phone: Yup.string().required("*Không được để trống "),
    server: Yup.string().required("*Không được để trống "),
  });

  const toMoney = (price: string) => {
    return price
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };

  const totalMoney = (price: string, pow: number) => {
    let money = +price * pow;
    return money
      .toString()
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };
  return (
    <Grid container>
      <Grid item md={7}>
        <DashboardBox
          sx={{
            padding: "20px 30px !important",
          }}
        >
          <Typography color="#726550" fontSize={30}>
            Nhập thông tin nạp
          </Typography>
          <Image src={Devider} alt="devider" width={440} height={14} />
          <Box>
            <Formik
              initialValues={{
                uid: "",
                server: "",
                account: "",
                password: "",
                ingame: "",
                phone: "",
                note: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={6}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="uid"
                          placeholder="UID (User ID)"
                          style={{
                            border: `1px solid ${
                              errors.uid && touched.uid ? "#d33" : "#E5DED4"
                            }`,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="server"
                          placeholder="Server"
                          style={{
                            border: `1px solid ${
                              errors.server && touched.server
                                ? "#d33"
                                : "#E5DED4"
                            }`,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={6}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="account"
                          placeholder="Tên tài khoản"
                          style={{
                            border: `1px solid ${
                              errors.account && touched.account
                                ? "#d33"
                                : "#E5DED4"
                            }`,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="password"
                          placeholder="Password"
                          style={{
                            border: `1px solid ${
                              errors.password && touched.password
                                ? "#d33"
                                : "#E5DED4"
                            }`,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={6}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="ingame"
                          placeholder="Tên nhân vật"
                          style={{
                            border: `1px solid ${
                              errors.ingame && touched.ingame
                                ? "#d33"
                                : "#E5DED4"
                            }`,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="phone"
                          placeholder="Số điện thoại"
                          style={{
                            border: `1px solid ${
                              errors.phone && touched.phone ? "#d33" : "#E5DED4"
                            }`,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Box>

                  <Grid item md={12}>
                    <Box>
                      <CustomField
                        name="note"
                        placeholder="Ghi chú"
                        style={{ width: "95%" }}
                      />
                    </Box>
                  </Grid>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: 4,
                        mt: 0.5,
                        mb: 0.5,
                        color: "#877C69",
                      }}
                    >
                      <ShoppingCartIcon sx={{ color: "#877C69" }} /> Giỏ hàng
                      hiện tại
                    </Box>
                    <Box
                      height={175}
                      sx={{
                        width: "95%",
                        margin: "0 auto",
                        borderRadius: "30px",
                        overflow: "hidden",
                      }}
                    >
                      <BodyHead>
                        <Box style={{ width: "40%" }}>Gói đã chọn</Box>
                        <Box style={{ width: "15%" }}>SL</Box>
                        <Box style={{ width: "45%" }}>Thành tiền</Box>
                      </BodyHead>
                      <BoxBody>
                        {cart.length > 0 &&
                          cart.map((d, index) => (
                            <BodyTable key={index + d.id}>
                              <Box width={"40%"}>{d.name}</Box>
                              <Box width={"15%"}>{d.quatily}</Box>
                              <Box width={"45%"}>
                                {totalMoney(d.price, d.quatily)}
                              </Box>
                            </BodyTable>
                          ))}
                      </BoxBody>
                    </Box>
                  </Box>
                  <button id="buttonBuy" type="submit">
                    Nạp tiền
                  </button>
                </Form>
              )}
            </Formik>
          </Box>
        </DashboardBox>
      </Grid>
      <Grid item md={5}>
        <Box textAlign={"center"} ml={5} pt={3}>
          <Typography color="#726550" fontSize={30}>
            Chọn gói cần nạp
          </Typography>
          <Image src={Devider} alt="devider" width={440} height={14} />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& .MuiGrid-item": {
                padding: "5px",
              },
            }}
          >
            {defauValue.map((d, i) => (
              <Grid item md={4} key={i}>
                <Box
                  height={122}
                  sx={{
                    background: `url(${BGPack.src})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    cursor: "pointer",
                    position: "relative",
                    filter: `${
                      d.quatily > 0 ? "brightness(1) " : "brightness(0.5) "
                    }`,
                  }}
                  onClick={() => {
                    addProduct(d.id);
                  }}
                >
                  <Value>{d.name}</Value>
                  {d.quatily > 0 && <Quatily>x{d.quatily}</Quatily>}
                  <Box pt={3}>
                    <Image src={dst300} alt="" />
                  </Box>
                </Box>
                <Price>{toMoney(d.price)}</Price>
              </Grid>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Two;
