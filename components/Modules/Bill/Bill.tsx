import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import background from "../../../styles/assets/images/Background.png";
import Paper from "../../../styles/assets/images/Shop/BillPaper.png";
import Thank from "../../../styles/assets/images/Shop/thank.png";
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
      height: 819px;
      width: 629px;
      background: url(${Paper.src});
      background-size: contain;
      background-repeat: no-repeat;
      margin: 0 auto;
      position:relative;
      z-index:2;
      padding: 45px 50px 45px 55px;
      text-align: center;
      display: flex;
      flex-direction: column;
    `
);
interface IBill {
  id: string;
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
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <Image src={Thank} alt="" width={434.81} height={352}></Image>
              </Box>
            </Grid>
            <Grid item md={6}>
              <BillBox>
                <Typography fontSize={30} lineHeight={2} color={"#144FB5"}>
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
                      fontSize={18}
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
                      fontSize={18}
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
                  <Grid container mt={2}>
                    <Grid
                      item
                      md={6}
                      textAlign="left"
                      fontFamily={"Montserrat"}
                      fontWeight={700}
                      fontSize={18}
                      color={"#58576D"}
                    >
                      Tổng tiền
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign="right"
                      fontFamily={"Montserrat"}
                      fontWeight={700}
                      fontSize={18}
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
                  <Typography color={"#144FB5"} fontSize={18}>
                    Lưu ý: Bạn vui lòng chụp lại hóa đơn để xác minh với Admin
                    nha.
                  </Typography>
                </Box>
              </BillBox>
            </Grid>
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
          </Grid>
        </Container>
      </Box>
    </ProductWrap>
  );
}

export default Bill;
