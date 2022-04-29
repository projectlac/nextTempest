import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import logo from "../../../styles/assets/images/Logo/logo-nho-1.png";
interface PropsMenu {
  activeMenu: boolean;
}
const MenuSWrapper = styled(Box)(
  ({ theme }) => `
    position: fixed;
    width: 350px;
    top: 0;
    left: 0;
    background: #111111e6;
    z-index: 999;
    height: 100vh;
    padding: 15px 50px;
    text-align:center;
    transform:translateX(-350px);
    transition: all 0.3s linear;
    `
);
const MenuTextBox = styled(Box)(
  ({ theme }) => `
        color:#fff;
        text-align:left;
      `
);
function MenuBox({ activeMenu }: PropsMenu) {
  const router = useRouter();
  const activeClass = (pathName: string) => {
    if (router.pathname === pathName) return "active";
    return "";
  };
  return (
    <MenuSWrapper
      sx={{
        transform: `${activeMenu ? "translateX(0)" : "translateX(-350px)"}`,
      }}
    >
      <Image src={logo} alt="" width={200} height={75} />
      <Divider
        sx={{ borderColor: "#fff", marginTop: "15px", marginBottom: "15px" }}
      />
      <MenuTextBox
        sx={{
          "& .MuiTypography-root": {
            padding: "25px 0",
            "&.active": {
              background: "#fff",
              borderRadius: "15px",
              paddingLeft: "15px",
              color: "#000",
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
      </MenuTextBox>
    </MenuSWrapper>
  );
}

export default MenuBox;
