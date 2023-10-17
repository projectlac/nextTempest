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
import { useEffect, useState } from "react";
import background from "../../../styles/assets/images/Shop/BG_Product_Tempest.png";
import Paper from "../../../styles/assets/images/Shop/BillPaper.png";
import Thank from "../../../styles/assets/images/Shop/thank.png";

import ThankMobile from "../../../styles/assets/images/Shop/thankMobile.png";

import { format } from "date-fns";
import { useRouter } from "next/router";
import audit from "../../../api/audit";
import PaiBill from "../../../styles/assets/images/Shop/PaiBill.png";
import toMoney from "../../../utility/toMoney";
const ProductWrap = styled(Box)(
  ({ theme }) => `
    height:1300px;
    width: 100vw;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    justify-content:center;
    @media (min-width: 0px) {
          height:800px;
      } 
      @media (min-width: 768px) {
         height:1300px;
      } 
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
        padding: 45px 50px 55px  55px;
        background-size: 100% auto;
      } 
    
      @media (min-width: 1024px) {
        height: 819px;
        width: 629px;
        padding: 45px 50px 55px  55px;
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
  const router = useRouter();
  const [time, setTime] = useState("");
  const [account, setAccount] = useState([]);
  const [type, setType] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const callApi = async () => {
      if (id) {
        try {
          const res = await audit.getAuditById(id);
          setTime(res.data.updatedAt);
          setAccount(res.data.information?.accounts);

          setType(res.data.information?.gmail);
          setCode(res.data.id?.split("-")[0]);
        } catch (error) {
          console.log(error);
        }
      }
    };
    callApi();
  }, [id, router]);
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
                        <th>Giá tiền</th>
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
                  {account[0]?.tofUsername != "" && (
                    <table className="table-bill">
                      <thead>
                        <tr>
                          <th>Tài khoản</th>
                          <th>Mật khẩu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {account &&
                          account.map((d) => (
                            <tr key={d.id}>
                              <td>{d.tofUsername}</td>
                              <td>{d.tofPassword}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
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
                      md={12}
                      xs={12}
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
                      Mã tài khoản: {account[0]?.code ?? ""}
                    </Grid>
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
                    width: "80%",
                  }}
                >
                  <Typography
                    color={"#144FB5"}
                    sx={{
                      fontSize: {
                        md: 16,
                        sm: 15,
                        xs: 10,
                      },
                      mt: {
                        lg: 0,
                        xs: 2,
                      },
                      "& a": {
                        color: "#d33",
                      },
                      "& a:before": {
                        content: '""',
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        backgroundSize: "contain",
                        transform: "translate(-15px, 24px) rotate(-45deg)",
                        backgroundRepeat: "no-repeat",
                        filter: "opacity(0.5)",
                      },
                      "& a.no-image:before": {
                        background: `transparent`,
                      },
                    }}
                  >
                    Vì lý do bảo mật: Vui lòng hiện hệ Page{" "}
                    <a
                      className="no-image"
                      href="https://www.facebook.com/Rimurushop128?mibextid=LQQJ4d"
                      target="__blank"
                      style={{
                        textDecoration: "underline",
                        position: "relative",
                      }}
                    >
                      Tempest Wibu
                    </a>{" "}
                    để được cấp tài khoản mật khẩu
                    <br />
                    Lưu ý: Bạn vui lòng chụp lại hóa đơn <br /> để xác minh với
                    <a
                      href="https://www.facebook.com/tranminhvu128/"
                      style={{
                        textDecoration: "underline",
                        position: "relative",
                      }}
                    >
                      Admin
                    </a>{" "}
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
