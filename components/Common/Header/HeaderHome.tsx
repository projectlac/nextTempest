/* eslint-disable react-hooks/exhaustive-deps */
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import tagApi from "../../../api/tag";
import { useAppContext } from "../../../context/state";
import logo from "../../../styles/assets/images/Logo/logo-nho-1.png";
import Authentization from "../../Modules/Authentization";
import MenuBox from "../Menu/MenuBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./Cart/Cart";
import UserInformation from "./UserInformation";

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
const BgWrap = styled(Box)(
  ({ theme }) => `
      height: 100vh;
      width: 100vw;
      display: flex;
      position:fixed;
      z-index:9;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      justify-content: center;
      align-items: center;
      background: transparent;
      overflow:hidden;
      background-size: cover;    
    `
);

function useOutsideAlerter(ref, closeCart) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeCart();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function HeaderHome() {
  const { update, updated, isLogin, refreshLogin, role } = useAppContext();

  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [ids, setIds] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  const wrapperRef = useRef(null);

  const closeCart = () => {
    setOpenCart(false);
  };

  useOutsideAlerter(wrapperRef, closeCart);

  useEffect(() => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    setIds(wishList);
    if (wishList && wishList.length > 0) {
      tagApi
        .getAccountByListID(wishList.toString())
        .then((res) => setData(res.data))
        .catch(() => {
          localStorage.setItem("wishList", JSON.stringify([]));
          router.push("/");
        });
    }
  }, [update]);

  const activeClass = (pathName: string) => {
    if (router.pathname === pathName) return "active";
    return "";
  };

  const [openAuth, setOpenAuth] = useState<boolean>(false);

  const closeAuthBox = () => {
    setOpenAuth(false);
  };

  const closeMenu = () => {
    setActiveMenu(false);
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    refreshLogin();
    router.push("/");
  };
  const login = () => {
    setOpenAuth(true);
  };

  const removeID = (id: string) => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    if (wishList && wishList.indexOf(id) !== -1) {
      const index = wishList.indexOf(id);
      if (index > -1) {
        wishList.splice(index, 1);
        localStorage.setItem("wishList", JSON.stringify(wishList));

        updated();
        // 2nd parameter means remove one item only
      }
    }
  };
  return (
    <div>
      <HeaderWrapper>
        <Box
          sx={{ textAlign: "center", width: { lg: 260, md: 230, xs: "50%" } }}
        >
          <Link href="/" passHref>
            <Box>
              <Image src={logo} alt="" width="150" height="60" />
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            width: {
              lg: "calc(100% - 260px)",
              sm: "calc(100% - 230px)",
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
                margin: { lg: " 0 20px", md: "0 15px" },
                fontSize: {
                  lg: "1rem",
                  md: "13px",
                },
                textDecoration: "none",
                paddingBottom: "6px",
                transition: "0.2s all linear",
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
            {["ADMIN", "MOD"].includes(role) && isLogin && (
              <Typography>
                <Link href="/dashboard">Quản lý</Link>
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "15px",
              border: "1px solid #fff",
              borderRadius: "999px",
              padding: "5px",
              display: "flex",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => {
              setOpenCart(!openCart);
            }}
          >
            <ShoppingCartIcon sx={{ color: "#fff", transform: "scale(0.8)" }} />
            <Cart
              wrapperRef={wrapperRef}
              openCart={openCart}
              ids={ids}
              data={data}
              removeID={removeID}
            />
            {ids && ids?.length > 0 && (
              <Typography
                sx={{
                  background: "#d33",
                  width: " 16px",
                  height: "16px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-2px",
                  right: "-6px",
                }}
              >
                {ids && ids?.length}
              </Typography>
            )}
          </Box>

          <UserInformation />
          <Box
            color="#fff"
            sx={{
              marginRight: "50px",
              border: "1px solid #fff",
              padding: "5px 25px",
              borderRadius: "15px",
              transition: "0.3s all linear",
              display: { md: "block", sm: "none", xs: "none" },
              "&:hover": {
                background: "#fff",
                color: "#000",
                borderColor: "#000",
              },
            }}
          >
            {isLogin ? (
              <Typography onClick={logout}>Đăng xuất</Typography>
            ) : (
              <Typography onClick={login}>Đăng nhập</Typography>
            )}
          </Box>

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
      {openAuth && (
        <BgWrap>
          <Container>
            <Authentization closeAuthBox={closeAuthBox} />
          </Container>
        </BgWrap>
      )}
      <MenuBox
        activeMenu={activeMenu}
        closeMenu={closeMenu}
        login={login}
        logout={logout}
      />
    </div>
  );
}

export default HeaderHome;
