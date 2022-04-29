import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import logo from "../../../styles/assets/images/Logo/logo-nho-1.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display:flex;
  width: 100%;
  min-width: 1280px;
  height: 66px;
  background-color: rgba(17,17,17,0.75);
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 35%);
  align-items:center;
  font-size: 14px;
  `
);

function HeaderHome() {
  const router = useRouter();
  const activeClass = (pathName: string) => {
    if (router.pathname === pathName) return "active";
    return "";
  };
  return (
    <div>
      <HeaderWrapper>
        <Box width={315} sx={{ textAlign: "center" }}>
          <Image src={logo} alt="" width="150" height="60" />
        </Box>
        <Box width="calc(100% - 315px)">
          <Box
            sx={{
              display: "flex",
              "& p.active a": {
                borderBottom: "3px solid #48A6E2",
              },
              "& a": {
                color: "#fff",
                margin: " 0 45px",
                textDecoration: "none",
                paddingBottom: "6px",

                "&:hover": {
                  textShadow:
                    "0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff",
                },
              },
            }}
          >
            <Typography className={`${activeClass("/")}`}>
              <Link href="/">Trang Chủ</Link>
            </Typography>
            <Typography className={`${activeClass("/mua-tai-khoan")}`}>
              <Link href="/mua-tai-khoan">Mua tài khoản </Link>
            </Typography>
            <Typography className={`${activeClass("/tin-tuc")}`}>
              <Link href="/tin-tuc">Tin Tức</Link>
            </Typography>

            <Typography className={`${activeClass("/nap-tien")}`}>
              <Link href="/nap-tien">Nạp Tiền </Link>
            </Typography>
            <Typography className={`${activeClass("/lien-he")}`}>
              <Link href="/lien-he">Liên hệ</Link>
            </Typography>
          </Box>
        </Box>
      </HeaderWrapper>
    </div>
  );
}

export default HeaderHome;
