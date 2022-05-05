import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import Crystal from "../../../../styles/assets/images/payment/Crystal.png";
import Avatar from "../../../../styles/assets/images/payment/avatar-cute-12.jpg";
import BGName from "../../../../styles/assets/images/payment/BGName.png";
import coin from "../../../../styles/assets/images/payment/coin.png";
import PaimonPayment from "../../../../styles/assets/images/payment/PaimonPayment.png";
import jwt_decode from "jwt-decode";
import CustomizedRadios from "../CustomItem/CustomizedRadios";
const DashboardBox = styled(Box)(
  ({ theme }) => `
            height: 555px;
            width: 100%;
            background-color: #F4ECE0;
              border: 1px solid #DAB88F;
              border-radius: 30px;
              position:relative;
              z-index: 1;
              padding: 40px;
              text-align:center;
          `
);
const AvatarBox = styled(Box)({
  width: "125px",
  height: "125px",
  margin: "0 auto",

  position: "relative",
});
const ImageBox = styled(Box)({
  borderRadius: "50%",
  width: "125px",
  height: "125px",
  border: "6px solid #BFAE9B",
  overflow: "hidden",
  marginTop: "-80px",
});
const CrystalBox = styled(Box)({
  width: "49px",
  height: "45px",
  position: "absolute",
  bottom: "-17px",
  left: 0,
  right: 0,
  margin: "0 auto",
});
const NameBox = styled(Box)({
  width: "296px",
  height: "44px",
  background: `url(${BGName.src})`,
  position: "absolute",
  left: "-38px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  paddingTop: "7px",
});
const TextBox = styled(Typography)({
  fontSize: "17px",
  color: "#726550",
  borderBottom: "1px solid #DCD0BF",
  padding: "10px 0",
  "&.active": {
    color: "#D09B5F",
  },
});
const Paimon = styled(Box)({
  position: "absolute",
  bottom: "-80px",
  left: "0",
  right: "0",
  margin: "0 auto",
});

function One() {
  const [value, setValue] = React.useState<string>("momo");

  const handleValue = (data: string) => {
    setValue(data);
  };
  const token = localStorage.getItem("access_token");

  const decodeToken = () => {
    if (Boolean(token)) return jwt_decode<any>(token).username;
    return "";
  };

  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
      <Grid item md={3}>
        <DashboardBox
          sx={{
            padding: "40px 10px !important",
          }}
        >
          <AvatarBox>
            <ImageBox>
              <Image src={Avatar} width={125} height={125} alt="crys" />
            </ImageBox>
            <CrystalBox>
              <Image src={Crystal} width={49} height={45} alt="crys" />
            </CrystalBox>
          </AvatarBox>
          <Typography mt={2} color="#D09B5F" fontSize={22}>
            VIP 01
          </Typography>
          <NameBox>
            <Typography
              color={"#94674B"}
              fontSize={18}
              textTransform="capitalize"
            >
              {decodeToken()}
            </Typography>
          </NameBox>
          <Box>
            <Typography>Số tiền hiện có</Typography>
            <Box
              sx={{
                marginTop: "35px",
                height: "50px",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 100%)",
                display: "flex",
                alignItems: "center",
                borderRadius: "15px",
              }}
            >
              <Box width={55}>
                <Image src={coin} alt="slime coin" width={55} height={55} />
              </Box>
              <Box width={"calc(100% - 55px)"}>
                <Typography fontSize={20} color="#94674B">
                  10.000.000
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={2}>
            <TextBox
              className="active"
              sx={{
                borderTop: "1px solid #DCD0BF",
              }}
            >
              Nạp vào ví
            </TextBox>
            <TextBox>Thông tin tài khoản</TextBox>
            <TextBox>Ưu đãi VIP</TextBox>
          </Box>
          <Paimon width={225} height={174}>
            <Image src={PaimonPayment} alt="Paimon" layout="responsive" />
          </Paimon>
        </DashboardBox>
      </Grid>
      <Grid item md={9}>
        <DashboardBox>
          <Typography color="#726550" fontSize={32}>
            Các hình thức thanh toán
          </Typography>
          <Image src={Devider} alt="devider" width={440} height={14} />
          <Box textAlign={"left"}>
            <CustomizedRadios handleValue={handleValue} />
          </Box>
          <Box sx={{ margin: "0 auto" }} width={440}>
            {(() => {
              switch (value) {
                case "momo":
                  return (
                    <Box textAlign={"left"}>
                      <Typography fontSize={20} color="#9C6546" mt={1}>
                        Số điện thoại:
                      </Typography>
                      <Typography fontSize={20} color="#D09B5F" mt={1}>
                        0344723594 - TRAN MINH VU
                      </Typography>
                      <Typography
                        fontSize={20}
                        color="#9C6546"
                        mt={1}
                      >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                    </Box>
                  );
                  break;
                case "bank":
                  return (
                    <Box textAlign={"left"}>
                      <Typography fontSize={20} color="#9C6546" mt={1}>
                        Số tài khoản:
                      </Typography>
                      <Typography fontSize={20} color="#D09B5F" mt={1}>
                        123456789 - TRAN MINH VU
                      </Typography>
                      <Typography
                        fontSize={20}
                        color="#9C6546"
                        mt={1}
                      >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                    </Box>
                  );
                  break;
                default:
                  return (
                    <Box textAlign={"left"}>
                      <Typography fontSize={20} color="#9C6546" mt={1}>
                        Số ét o ét:
                      </Typography>
                      <Typography fontSize={20} color="#D09B5F" mt={1}>
                        0344723594 - TRAN MINH VU
                      </Typography>
                      <Typography
                        fontSize={20}
                        color="#9C6546"
                        mt={1}
                      >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                    </Box>
                  );
              }
            })()}
          </Box>

          <Box mt={5} mb={1}>
            <Image src={Devider} alt="devider" width={440} height={14} />
          </Box>
          <Box>
            <Typography
              fontSize={14}
              color="#C69E72"
              sx={{
                "& span": {
                  color: "#94674B",
                },
              }}
            >
              <span>Lưu ý:</span> Vui lòng nạp đúng nội dung để được cộng tiền
              nhanh nhất. Những tài khoản nạp sai nội dung của website sẽ bị trừ{" "}
              <span>10% số tiền</span>. Sau khi nạp từ 10-15 phút chưa nhận được
              tiền trong tài khoản vui lòng liên hệ <span>Admin</span> để được
              hỗ trợ.
            </Typography>
          </Box>
        </DashboardBox>
      </Grid>
    </Grid>
  );
}

export default One;
