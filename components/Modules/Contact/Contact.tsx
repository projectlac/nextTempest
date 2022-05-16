import React from "react";
import { Box, Button, Container, Hidden, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BGW from "../../../styles/assets/images/Contact/BGwrap.png";
import BGC from "../../../styles/assets/images/Contact/BGContact.png";
import Devider from "../../../styles/assets/images/payment/PaymentDevider.png";
import PaimonContact from "../../../styles/assets/images/Shop/PaimonContact.png";

import FB from "../../../styles/assets/images/svg/facebook.svg";
// import ZL from "../../../styles/assets/images/svg/zalo.svg";
import INS from "../../../styles/assets/images/svg/instagram.svg";

import Image from "next/image";
const BgWrap = styled(Box)(
  ({ theme }) => `
    height: 100vh;
    width: 100vw;
    display: flex;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    justify-content: center;
    align-items: center;
    background: url(${BGW.src});
    overflow:hidden;
    background-size: cover;
  `
);
const ContactBox = styled(Box)(
  ({ theme }) => `
    height: 856px;
    width: 100%;
    display: flex;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    position:relative;
    z-index: 0;
    justify-content: center;
    align-items: center;
    background: url(${BGC.src});
    margin:0 auto;
    background-size: contain;
    padding:50px;
    @media (min-width: 0px) {
      width: 98%;
      height: 522px;
      top: 20%;
    } 
    @media (min-width: 768px){
      width: 635px;
      height: 416px;
      top: 40%;
    }
    @media (min-width: 1024px) {
      top: 40%;
      width:875px;
      height:573px;
    } 
    @media (min-width: 1440px) {
      top: 50%;
      width: 875px;
      height: 573px;
    } 

  `
);

const ButtonContact = styled(Box)(
  ({ theme }) => `
    width: 350px;
    height: 55px;
    margin: 0 auto 15px;
    color: #D3A36E;
    border: 1px solid #D3A36E;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 30px;
    padding-left: 85px;
    font-size: 17px;

    @media (min-width: 0px) {
      width: 350px;
      height: 55px;
    } 
    @media (min-width: 768px){
      width: 269px;
      height: 43px;
      margin: 0 auto 8px;
      padding-left: 57px;
    }
    @media (min-width: 1024px) {
      width: 350px;
      height: 55px; padding-left: 85px;
      margin: 0 auto 15px;
    } 
    @media (min-width: 1440px) {
      width: 350px;
      height: 55px;
    } 
  `
);

const Paimon = styled(Box)(
  ({ theme }) => `
    position:absolute;
    bottom: 0;
    left: -25px;
    @media (min-width: 0px) {
      height: 0px;
    width: 0px;
    } 
    @media (min-width: 768px){
      height: 175px;
      width: 175px;
    }
    @media (min-width: 1024px) {
      height: 250px;
    width: 250px;
    }
    @media (min-width: 1440px) {
      height: 250px;
    width: 250px;
    } 

  `
);

function Contact() {
  return (
    <BgWrap>
      <Container>
        <ContactBox>
          <Box textAlign={"center"}>
            <Typography
              color="#CB8C47"
              sx={{
                width: "80%",
                margin: "0 auto",
                fontSize: {
                  md: "20px",
                  sm: "16px",
                },
              }}
            >
              Nếu bạn có bất kỳ câu hỏi hay vấn đề gì xảy ra trong quá trình
              chọn mua tài khoản hoặc nạp tiền.
            </Typography>
            <Image src={Devider} alt="devider" width={440} height={14} />
            <Typography
              color="#722C1B"
              sx={{
                width: "75%",
                margin: "0 auto",
                fontSize: {
                  md: "20px",
                  sm: "16px",
                },
              }}
            >
              Vui lòng liên hệ theo các hình thức dưới đây để được trợ giúp
            </Typography>
            <Box mt={3}>
              <ButtonContact>
                <Box width={30} height={30} sx={{ mr: 2 }}>
                  <Image src={FB} alt="facebook" layout="responsive" />
                </Box>
                Trần Minh Vũ
              </ButtonContact>
              <ButtonContact>
                <Box width={30} height={30} sx={{ mr: 2 }}>
                  <Image src={FB} alt="facebook" layout="responsive" />
                </Box>
                Tempest Shop
              </ButtonContact>
              <ButtonContact>
                <Box width={30} height={30} sx={{ mr: 2 }}>
                  <Image src={INS} alt="facebook" layout="responsive" />
                </Box>
                Zalo
              </ButtonContact>
              <ButtonContact>
                <Box width={30} height={30} sx={{ mr: 2 }}>
                  <Image src={INS} alt="facebook" layout="responsive" />
                </Box>
                tempest.vn
              </ButtonContact>
            </Box>
          </Box>
          <Paimon>
            <Image src={PaimonContact} alt="" layout="responsive"></Image>
          </Paimon>
        </ContactBox>
      </Container>
    </BgWrap>
  );
}

export default Contact;
