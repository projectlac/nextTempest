import { Container, Divider, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BG from "../../../styles/assets/images/footerBg.jpg";
import logo from "../../../styles/assets/images/Logo/logo-nho-1.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FaDiscord } from "react-icons/fa";
const FooterWrapper = styled(Box)({
  height: "350px",
  width: "100vw",
  backgroundColor: "#000",
  backgroundImage: `url(${BG.src})`,
  position: "relative",
  backgroundSize: "cover",
  "&::before": {
    position: "absolute",
    zIndex: "2",
    top: "0",
    left: "0",
    display: "block",
    content: "''",
    width: "100%",
    height: "100%",
    background: "rgb(0 0 0 / 67%)",
  },
});
const TopFooter = styled(Box)({
  height: "50px",
  width: "100vw",
  backgroundColor: "#111111b5",
  color: "#fff",
  zIndex: "2",
  position: "relative",
  textAlign: "center",
  fontSize: "15px",
  fontFamily: "'Montserrat'",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function Footer() {
  return (
    <FooterWrapper>
      <Container
        sx={{ position: "relative", zIndex: 3, height: "calc(350px - 50px)" }}
      >
        <Box
          sx={{
            textAlign: "center",
            pt: 2,
            "& img": {
              WebkitFilter: "drop-shadow(1px 2px 4px  #69e0ff)",
              filter: "drop-shadow(1px 2px 4px  #69e0ff)",
            },
          }}
        >
          <Image src={logo} alt="" width="200" height="80" />
          <Typography
            sx={{
              color: "#fff",
              fontSize: "15px",
              marginTop: "8px",
            }}
          >
            Tempest Genshin nơi cung cấp tài khoản, Nạp game an toàn nhất Việt
            Nam
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid #fff",
              width: "700px",
              margin: "15px auto",
              paddingTop: "15px",
              "& a": {
                color: "#fff",
                padding: "0 15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
              },
            }}
          >
            <Link href={"/"}> Trang chủ</Link>
            <Link href={"/mua-tai-khoan"}>Mua tài khoản</Link>
            <Link href={"/tin-tuc"}>Tin Tức</Link>
            <Link href={"nap-tien"}>Nạp Tiền</Link>
            <Link href={"/lien-he"}>Liên hệ</Link>
          </Box>
          <Box
            sx={{
              width: "700px",
              margin: "15px auto",
              paddingTop: "30px",
              "& a": {
                color: "#fff",
                padding: "0 15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& svg": {
                  mr: 1,
                },
              },
            }}
          >
            <Link href={"tel:0344723594"}>
              <a>
                <PhoneAndroidIcon /> 0344723594
              </a>
            </Link>
            <Link href={"#"}>
              <a>
                <AccessTimeIcon />
                24/7
              </a>
            </Link>
            <Link href={"https://www.facebook.com/Rimurushop128"}>
              <a>
                <FacebookIcon /> Tempest Wibu
              </a>
            </Link>
            <Link href={"https://discord.com/invite/st7vzKksH5"}>
              <a>
                <FaDiscord style={{ fontSize: "25px" }} /> Tempest Wibu
              </a>
            </Link>
          </Box>
        </Box>
      </Container>
      <TopFooter>
        © Copyright 2022. All rights reserved. Design by Tempest.vn
      </TopFooter>
    </FooterWrapper>
  );
}

export default Footer;
