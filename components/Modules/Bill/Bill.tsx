import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import background from "../../../styles/assets/images/Background.png";
import Paper from "../../../styles/assets/images/Shop/BillPaper.png";
import Thank from "../../../styles/assets/images/Shop/thank.png";
import ThankMobile from "../../../styles/assets/images/Shop/thankMobile.png";

import PaiBill from "../../../styles/assets/images/Shop/PaiBill.png";
import toMoney from "../../../utility/toMoney";
import audit from "../../../api/audit";
import { format } from "date-fns";
const ProductWrap = styled(Box)(
  ({ theme }) => `
    height:100vh;
    width: 100vw;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    justify-content:center;
  `
);
const BillBox = styled(Box)(
  ({ theme }) => `
     
      background: url(${Paper.src});
      background-size: contain;
      background-repeat: no-repeat;
      margin: 0 auto;
      position:relative;
      z-index:2;
    
      text-align: center;
      display: flex;
      flex-direction: column;
      @media (min-width: 0px) {
        width: 100%;
        height: 466px;
        padding: 20px 25px 20px 25px;
        background-size: 100% auto;
      } 
      @media (min-width: 768px) {
        width: 100%;
        height: 819px;
        padding: 45px 50px 45px 55px;
        background-size: 100% auto;
      } 
    
      @media (min-width: 1024px) {
        height: 819px;
        width: 629px;
        padding: 45px 50px 45px 55px;
        background-size: contain;
    `
);
interface IBill {
  id: string;
}
interface IUserData {
  tofPassword: string;
  tofUsername: string;
}
function Bill({ id }: IBill) {
  const [time, setTime] = useState("");
  const [account, setAccount] = useState([]);
  const [type, setType] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    audit.getAuditById(id).then((res) => {
      setTime(res.data.updatedAt);
      setAccount(res.data.information.accounts);

      setType(res.data.information.gmail);
      setCode(res.data.id.split("-")[0]);
    });
  }, [id]);
  const totalMoney = () => {
    const money = account.reduce((a, v) => a + +v.newPrice, 0);
    return money;
  };
  return (
    <ProductWrap>
      <Box mb={20} mt={12}>
        <Container fixed>
          <Grid container>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  md: "auto",
                  xs: "center",
                },
              }}
            >
              <Hidden mdDown>
                <Box>
                  <Image src={Thank} alt="" width={434.81} height={352}></Image>
                </Box>
              </Hidden>
              <Hidden mdUp>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={ThankMobile}
                    alt=""
                    width={320}
                    height={150}
                    objectFit="contain"
                  ></Image>
                </Box>
              </Hidden>
            </Grid>
            <Grid item md={6} xs={12}>
              <BillBox>
                <Typography
                  sx={{
                    fontSize: {
                      md: 30,
                      xs: 20,
                    },
                  }}
                  lineHeight={2}
                  color={"#144FB5"}
                >
                  Hóa đơn mua hàng
                </Typography>
                <Box mt={4}>
                  <Grid container>
                    <Grid
                      item
                      md={6}
                      textAlign="left"
                      fontFamily={"Montserrat"}
                      fontWeight={700}
                      sx={{
                        fontSize: {
                          md: 18,
                          xs: 15,
                        },
                      }}
                      color={"#58576D"}
                    >
                      Ngày: {time && format(new Date(time), "dd/MM/yyyy")}
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign="right"
                      fontFamily={"Montserrat"}
                      fontWeight={700}
                      sx={{
                        fontSize: {
                          md: 18,
                          xs: 15,
                        },
                      }}
                      color={"#58576D"}
                      textTransform={"uppercase"}
                    >
                      Đơn hàng: #{code && code}
                    </Grid>
                  </Grid>
                  <table className="table-bill">
                    <thead>
                      <tr>
                        <th>Mã sản phẩm</th>
                        <th>Loại BH</th>
                        <th>Giá tền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {account &&
                        account.map((d) => (
                          <tr key={d.id}>
                            <td>{d.code}</td>
                            <td>
                              {type && (type !== null || type !== "") ? 2 : 1}
                            </td>
                            <td>{toMoney(d.newPrice)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Box mt={3}>
                    <Divider></Divider>
                  </Box>
                  <Grid
                    container
                    sx={{
                      mt: {
                        md: 2,
                        xs: 1,
                      },
                    }}
                  >
                    <Grid
                      item
                      md={6}
                      xs={6}
                      textAlign="left"
                      fontFamily={"Montserrat"}
                      fontWeight={700}
                      sx={{
                        fontSize: {
                          md: 18,
                          xs: 15,
                        },
                      }}
                      color={"#58576D"}
                    >
                      Tổng tiền
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={6}
                      textAlign="right"
                      fontFamily={"Montserrat"}
                      fontWeight={700}
                      sx={{
                        fontSize: {
                          md: 18,
                          xs: 15,
                        },
                      }}
                      color={"#58576D"}
                    >
                      {time && toMoney(totalMoney())}VND
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    height: "125px",
                    margin: "0 auto",
                    marginTop: "auto",
                    width: "75%",
                  }}
                >
                  <Typography
                    color={"#144FB5"}
                    sx={{
                      fontSize: {
                        md: 18,
                        xs: 15,
                      },
                      mt: {
                        lg: 0,
                        xs: 2,
                      },
                    }}
                  >
                    Lưu ý: Bạn vui lòng chụp lại hóa đơn để xác minh với Admin
                    nha.
                  </Typography>
                </Box>
              </BillBox>
            </Grid>
            <Hidden lgDown>
              <Grid
                item
                md={3}
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "-200px",
                    width: "554px",
                    height: "796px",
                    zIndex: 0,
                  }}
                >
                  <Image
                    src={PaiBill}
                    alt=""
                    objectFit="contain"
                    layout="responsive"
                  ></Image>
                </Box>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </Box>
    </ProductWrap>
  );
}

export default Bill;
