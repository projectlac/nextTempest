import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import logo from "../../../styles/assets/images/Logo/logo-nho-1.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuBox from "../Menu/MenuBox";
import { useAppContext } from "../../../context/state";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display:flex;
  width: 100%;
  height: 66px;
  background-color: rgba(17,17,17,0.75);
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 35%);
  align-items:center;
  font-size: 14px;
  `
);

function HeaderHome() {
  const { isLogin, refreshLogin } = useAppContext();
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const router = useRouter();

  const activeClass = (pathName: string) => {
    if (router.pathname === pathName) return "active";
    return "";
  };

  const closeMenu = () => {
    setActiveMenu(false);
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    refreshLogin();
    router.push("/");
  };
  return (
    <div>
      <HeaderWrapper>
        <Box sx={{ textAlign: "center", width: { md: 260, xs: "50%" } }}>
          <Link href="/" passHref>
            <Box>
              <Image src={logo} alt="" width="150" height="60" />
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            width: {
              sm: "calc(100% - 260px)",
              xs: "50%",
            },
            display: "flex",
            justifyContent: {
              md: "space-between",
              sm: "flex-end",
              xs: "flex-end",
            },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { md: "flex", sm: "none", xs: "none" },
              "& p.active a": {
                borderBottom: "3px solid #48A6E2",
              },
              "& a": {
                color: "#fff",
                margin: { lg: " 0 45px", md: "0 15px" },
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
          {isLogin && (
            <Box
              color="#fff"
              sx={{
                marginRight: "50px",
                border: "1px solid #fff",
                padding: "5px 25px",
                borderRadius: "15px",
                display: { md: "block", sm: "none", xs: "none" },
              }}
            >
              <Typography onClick={logout}>Đăng xuất</Typography>
            </Box>
          )}

          <Box
            sx={{
              display: { md: "none", sm: "block" },
              textAlign: "right",
              paddingRight: { sm: "50px", xs: "15px" },
            }}
          >
            {activeMenu ? (
              <MenuOpenIcon
                sx={{
                  color: "#fff",
                  transform: "scale(1.5)",
                  marginTop: "10px",
                }}
                onClick={() => {
                  setActiveMenu(false);
                }}
              />
            ) : (
              <MenuIcon
                sx={{
                  color: "#fff",
                  transform: "scale(1.5)",
                  marginTop: "10px",
                }}
                onClick={() => {
                  setActiveMenu(true);
                }}
              />
            )}
          </Box>
        </Box>
      </HeaderWrapper>
      <MenuBox activeMenu={activeMenu} closeMenu={closeMenu} />
    </div>
  );
}

export default HeaderHome;
