import styled from "@emotion/styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, CircularProgress, Grid, Hidden, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import * as Yup from "yup";
import BGPack from "../../../../styles/assets/images/payment/BGPack.png";

import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import Quati from "../../../../styles/assets/images/payment/Quati.png";
import { AuditInformation, Pack } from "../../../../types";

import MoonPack from "../../../../styles/assets/images/PackList/MoonPack.png";
import BP1 from "../../../../styles/assets/images/PackList/BP1.png";
import BP2 from "../../../../styles/assets/images/PackList/BP2.png";
import Layer62 from "../../../../styles/assets/images/PackList/Layer62.png";
import Layer63 from "../../../../styles/assets/images/PackList/Layer63.png";
import Layer64 from "../../../../styles/assets/images/PackList/Layer64.png";
import Layer65 from "../../../../styles/assets/images/PackList/Layer65.png";
import Layer66 from "../../../../styles/assets/images/PackList/Layer66.png";
import audit from "../../../../api/audit";
import { useAppContext } from "../../../../context/state";
const CustomField = styled(Field)(({ theme }) => ({
  width: "90%",
  background: "#E5DED4",
  border: "none",
  outline: "none",
  borderRadius: "20px",
  marginBottom: "10px",
  fontSize: "18px",
  padding: "15px 25px",
  fontFamily: "'Signika'",
  "@media (min-width:0)": {
    fontSize: "13px",
    height: "45px",
    padding: "15px",
  },
  "@media (min-width: 1024px)": {
    fontSize: "18px",
    height: "57px",
    padding: "15px 25px",
  },
}));
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

const Price = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
  background: "#f4ece0",
  border: "solid 1px #DAB88F",
  borderBottomRightRadius: "15px",
  borderBottomLeftRadius: "15px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#94674B",

  "@media (min-width:0)": {
    fontSize: "12px",
    height: "30px",
  },
  "@media (min-width:768px)": {
    fontSize: "14px",
    height: "30px",
  },
  "@media (min-width: 1024px)": {
    fontSize: "14px",
    height: "35px",
  },
}));

const Value = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "13px",
  left: "0",
  right: "0",
  zIndex: "1",
  color: "#94674B",
  "@media (min-width:0)": {
    fontSize: "13px",
  },
  "@media (min-width: 768px)": {
    fontSize: "15px",
  },
  "@media (min-width: 1024px)": {
    fontSize: "15px",
  },
}));
const Quatily = styled(Box)(({ theme }) => ({
  color: "#fff",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  "@media (min-width:0)": {
    fontSize: "20px",
    width: "40px",
    height: "40px",
  },
  "@media (min-width: 768px)": {
    fontSize: "30px",
    width: "55px",
    height: "55px",
  },
  "@media (min-width: 1024px)": {
    fontSize: "30px",
  },
}));

const Minus = styled(Box)(({ theme }) => ({
  background: "#fff",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  color: "#66635e",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
}));

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
    "@media (min-width:0)": {
      fontSize: "13px",
    },
    "@media (min-width: 768px)": {
      fontSize: "15px",
    },
    "@media (min-width: 1024px)": {
      fontSize: "16px",
    },
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
    "@media (min-width:0)": {
      fontSize: "13px",
    },
    "@media (min-width: 768px)": {
      fontSize: "15px",
    },
    "@media (min-width: 1024px)": {
      fontSize: "16px",
    },
    "&first-of-type": {
      borderLeft: "none",
    },
  },
});
function Two() {
  const { handleChangeMessageToast, handleChangeStatusToast } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [defauValue, setDefaultValue] = useState<Pack[]>([
    {
      name: "Thẻ tháng",
      id: "1",
      price: "105000",
      image: `${MoonPack.src}`,
      quantily: 0,
    },
    {
      name: "Battle pass loại 1",
      id: "2",
      price: "210000",
      image: `${BP1.src}`,
      quantily: 0,
    },
    {
      name: "Battle pass loại 2",
      id: "3",
      price: "430000",
      image: `${BP2.src}`,
      quantily: 0,
    },
    {
      name: "6480 ĐST",
      id: "4",
      price: "2000000",
      image: `${Layer66.src}`,
      quantily: 0,
    },
    {
      name: "3280 ĐST",
      id: "5",
      price: "1000000",
      image: `${Layer65.src}`,
      quantily: 0,
    },
    {
      name: "1980 ĐST",
      id: "6",
      price: "630000",
      image: `${Layer64.src}`,
      quantily: 0,
    },
    {
      name: "980 ĐST",
      id: "7",
      price: "320000",
      image: `${Layer63.src}`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "8",
      price: "105000",
      image: `${Layer62.src}`,
      quantily: 0,
    },
  ]);

  const [cart, setCard] = useState<Pack[]>([]);
  const addProduct = (id: string) => {
    const tempValue = [...defauValue];
    const index = tempValue.findIndex((d) => d.id === id);

    tempValue[index].quantily++;
    setDefaultValue(tempValue);

    const carTemp = [...cart];
    const indexCart = carTemp.findIndex((d) => d.id === id);
    indexCart > -1
      ? carTemp[indexCart].quantily + 1
      : carTemp.push(tempValue[index]);

    setCard(carTemp);
  };

  const removeProduct = (id: string) => {
    const tempValue = [...defauValue];
    const index = tempValue.findIndex((d) => d.id === id);

    tempValue[index].quantily--;
    setDefaultValue(tempValue);

    const carTemp = [...cart];
    const indexCart = carTemp.filter((d) => d.quantily > 0);

    setCard(indexCart);
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
      <Hidden mdDown>
        <Grid item md={7} xs={12}>
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
                onSubmit={async (values, { resetForm }) => {
                  const {
                    uid,
                    server,
                    account,
                    password,
                    ingame,
                    phone,
                    note,
                  } = values;
                  if (cart.length > 0) {
                    const auditInformation: AuditInformation[] = [...cart].map(
                      (d) => ({
                        name: d.name,
                        quantity: +d.quantily,
                        unitPrice: +d.price,
                      })
                    );
                    setLoading(true);
                    try {
                      await audit
                        .buyPack({
                          UID: uid,
                          accountName: ingame,
                          auditInformation,
                          note,
                          phone,
                          password,
                          server,
                          username: account,
                        })
                        .then((res) => {
                          handleChangeMessageToast("Bạn đã mua thành công!");
                          resetForm();
                          setCard([]);
                          handleChangeStatusToast();
                        })
                        .catch((err) => {
                          handleChangeMessageToast(err.response.data.message);
                          handleChangeStatusToast();
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    } catch (error) {}
                  }
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
                        <Box sx={{ position: "relative" }}>
                          <CustomField
                            name="password"
                            type="password"
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
                        <Box sx={{ position: "relative" }}>
                          <CustomField
                            name="phone"
                            placeholder="Số điện thoại"
                            style={{
                              border: `1px solid ${
                                errors.phone && touched.phone
                                  ? "#d33"
                                  : "#E5DED4"
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
                          fontSize: "15px",
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
                                <Box width={"15%"}>{d.quantily}</Box>
                                <Box width={"45%"}>
                                  {totalMoney(d.price, d.quantily)}
                                </Box>
                              </BodyTable>
                            ))}
                        </BoxBody>
                      </Box>
                    </Box>
                    <button id="buttonBuy" type="submit" disabled={loading}>
                      {loading ? <CircularProgress /> : " Nạp tiền"}
                    </button>
                  </Form>
                )}
              </Formik>
            </Box>
          </DashboardBox>
        </Grid>
      </Hidden>
      <Grid item md={5} xs={12}>
        <Box
          textAlign={"center"}
          sx={{
            ml: {
              md: 5,
              xs: 0,
            },
          }}
          pt={3}
        >
          <Typography
            color="#726550"
            sx={{
              fontSize: {
                md: 30,
                xs: 20,
              },
              position: "relative",
              zIndex: "2",
            }}
          >
            Chọn gói cần nạp
          </Typography>
          <Image src={Devider} alt="devider" width={440} height={14} />
          <Grid container rowSpacing={2} columnSpacing={2}>
            {defauValue.map((d, i) => (
              <Grid item md={4} xs={4} sm={3} key={i}>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  {d.quantily > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        background: "#0000008c",
                        zIndex: "2",
                        height: {
                          md: "124px",
                          sm: "152px",
                          xs: "107px",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Minus
                          onClick={() => {
                            removeProduct(d.id);
                          }}
                        >
                          -
                        </Minus>
                        <Quatily>{d.quantily}</Quatily>
                        <Minus
                          onClick={() => {
                            addProduct(d.id);
                          }}
                        >
                          +
                        </Minus>
                      </Box>
                    </Box>
                  )}

                  <Box
                    sx={{
                      height: {
                        md: "124px",
                        sm: "152px",
                        xs: "107px",
                      },
                      // background: `url(${BGPack.src})`,
                      backgroundSize: "110%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      cursor: "pointer",
                      position: "relative",

                      border: "4px solid #88543c",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      addProduct(d.id);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pointerEvents: "none",
                        height: "100%",
                      }}
                      overflow="hidden"
                    >
                      {d.id !== "1" && <Value>{d.name}</Value>}
                      <Image
                        src={d.image}
                        alt=""
                        width={300}
                        height={300}
                        objectFit="contain"
                        objectPosition="bottom center"
                      />
                    </Box>
                  </Box>
                  <Price>{toMoney(d.price)}</Price>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Hidden mdUp>
        <Grid item md={7} xs={12} mt={2}>
          <DashboardBox
            sx={{
              padding: {
                md: "20px 30px !important",
                xs: "20px 15px !important",
              },
            }}
          >
            <Typography
              color="#726550"
              sx={{
                fontSize: {
                  md: 30,
                  xs: 20,
                },
              }}
            >
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
                onSubmit={async (values, { resetForm }) => {
                  const {
                    uid,
                    server,
                    account,
                    password,
                    ingame,
                    phone,
                    note,
                  } = values;
                  if (cart.length > 0) {
                    const auditInformation: AuditInformation[] = [...cart].map(
                      (d) => ({
                        name: d.name,
                        quantity: +d.quantily,
                        unitPrice: +d.price,
                      })
                    );
                    setLoading(true);
                    try {
                      await audit
                        .buyPack({
                          UID: uid,
                          accountName: ingame,
                          auditInformation,
                          note,
                          phone,
                          password,
                          server,
                          username: account,
                        })
                        .then((res) => {
                          handleChangeMessageToast("Bạn đã mua thành công!");
                          resetForm();
                          setCard([]);
                          handleChangeStatusToast();
                        })
                        .catch((err) => {
                          handleChangeMessageToast(err.response.data.message);
                          handleChangeStatusToast();
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    } catch (error) {}
                  }
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
                        <Box sx={{ position: "relative" }}>
                          <CustomField
                            name="password"
                            type="password"
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
                      <Grid item md={6} sm={6} xs={6}>
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
                      <Grid item md={6} sm={6} xs={6}>
                        <Box sx={{ position: "relative" }}>
                          <CustomField
                            name="phone"
                            placeholder="Số điện thoại"
                            style={{
                              border: `1px solid ${
                                errors.phone && touched.phone
                                  ? "#d33"
                                  : "#E5DED4"
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
                                <Box width={"15%"}>{d.quantily}</Box>
                                <Box width={"45%"}>
                                  {totalMoney(d.price, d.quantily)}
                                </Box>
                              </BodyTable>
                            ))}
                        </BoxBody>
                      </Box>
                    </Box>
                    <button id="buttonBuy" type="submit" disabled={loading}>
                      {loading ? <CircularProgress /> : " Nạp tiền"}
                    </button>
                  </Form>
                )}
              </Formik>
            </Box>
          </DashboardBox>
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default Two;
