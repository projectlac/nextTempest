/* eslint-disable react-hooks/exhaustive-deps */
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import tagApi from "../../../api/tag";
import { useAppContext } from "../../../context/state";
import logo from "../../../styles/assets/images/Logo/logoWithoutGame.png";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useTrans from "../../../pages/hook/useTrans";
import Authentization from "../../Modules/Authentization";
import MenuBox from "../Menu/MenuBox";
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
  background-color: rgba(17,17,17,0.60);
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

const ParentMenu = styled(Box)({
  position: "relative",
  "& a": { padding: 0, marginBottom: 0, paddingBottom: "6px" },
  "&:hover": {
    "& > div": {
      opacity: 1,
      visibility: "inherit",
    },
  },
  "&.active a": { borderBottom: "3px solid #48A6E2" },
});
const ChildMenu = styled(Box)({});
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
  const trans = useTrans();
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
    else {
      if (pathName !== "/") {
        if (router.pathname.includes(pathName)) return "active";
        return "";
      }
    }
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
          sx={{
            width: "100%",
            display: "flex",
            padding: { md: "50px", xs: "0px" },
            zIndex: "2",
            position: "relative",
          }}
        >
          <Box
            sx={{ textAlign: "center", width: { lg: 260, md: 230, xs: "50%" } }}
          >
            <Link href="/" passHref>
              <Box>
                <Image src={logo} alt="" width="150" height="50" />
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
                "& h2.active a": {
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
              <Typography component="h2" className={`${activeClass("/")}`}>
                <Link href="/">{trans[1][0]}</Link>
              </Typography>
              <ParentMenu className={`${activeClass("/mua-tai-khoan")}`}>
                <Link href="#">{trans[1][1]}</Link>
                <ChildMenu
                  sx={{
                    opacity: 0,
                    visibility: "hidden",
                    background: "#fff",
                    position: "absolute",
                    left: "0",
                    top: "40px",
                    border: "4px solid #3b5898",
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s",
                    "& a": {
                      color: "#000",
                      padding: "10px 10px 10px",
                      margin: "0",
                      borderBottom: "1px solid !important",
                      transition: "all 0.2s",
                      fontSize: "13px",
                      "&:last-child": {
                        borderBottom: "none",
                      },
                      "&:hover": {
                        background: "#97c3ea",
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ArrowDropUpIcon
                    sx={{
                      color: "#fff",
                      position: "absolute",
                      top: "-14px",
                      left: "15%",
                    }}
                  />
                  <Link
                    href={{
                      pathname: "/mua-tai-khoan/[id]",
                      query: {
                        id: "honkai-star-rail",
                        search: "VIP,NEW",
                        page: "1",
                      },
                    }}
                  >
                    Honkai Star Rail
                  </Link>
                  <Link
                    href={{
                      pathname: "/mua-tai-khoan/[id]",
                      query: {
                        id: "genshin-impact",
                        search: "VIP,NEW",
                        page: "1",
                      },
                    }}
                  >
                    Genshin impact
                  </Link>
                  <Link
                    href={{
                      pathname: "/mua-tai-khoan/[id]",
                      query: { id: "tower-of-fantasy", page: "1" },
                    }}
                  >
                    Tower of fantasy
                  </Link>
                  <Link href="/reroll">Reroll</Link>
                  <Link href="/random">Random</Link>
                </ChildMenu>
              </ParentMenu>
              {/* <Typography
                component="h2"
                className={`${activeClass("/tin-tuc")}`}
              >
                <Link href="/tin-tuc">{trans[1][2]}</Link>
              </Typography> */}

              <ParentMenu className={`${activeClass("/nap-tien")}`}>
                <Link href="/nap-tien">{trans[1][3]}</Link>
                <ChildMenu
                  sx={{
                    opacity: 0,
                    visibility: "hidden",
                    background: "#fff",
                    position: "absolute",
                    left: "0",
                    top: "40px",
                    border: "4px solid #3b5898",
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s",
                    "& a": {
                      color: "#000",
                      padding: "10px 10px 10px",
                      margin: "0",
                      borderBottom: "1px solid !important",
                      transition: "all 0.2s",
                      fontSize: "13px",
                      "&:last-child": {
                        borderBottom: "none",
                      },
                      "&:hover": {
                        background: "#97c3ea",
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ArrowDropUpIcon
                    sx={{
                      color: "#fff",
                      position: "absolute",
                      top: "-14px",
                      left: "15%",
                    }}
                  />
                  {/* <Link
                    href={{
                      pathname: "/mua-tai-khoan/[id]",
                      query: { id: "honkai-star-rail", search: "VIP,NEW" },
                    }}
                  >
                    Nạp thẻ cào
                  </Link> */}
                  <Link
                    href={{
                      pathname: "/nap-tien",
                      query: { action: "bank" },
                    }}
                  >
                    Nạp ATM
                  </Link>
                  <Link
                    href={{
                      pathname: "/nap-tien",
                      query: { action: "momo" },
                    }}
                  >
                    Nạp MOMO
                  </Link>
                </ChildMenu>
              </ParentMenu>
              <Typography component="h2">
                <a
                  href="https://www.facebook.com/tempest.goods?locale=vi_VN"
                  target="__blank"
                >
                  Order Goods & Doll
                </a>
              </Typography>
              {/* <Typography
                component="h2"
                className={`${activeClass("/lien-he")}`}
              >
                <Link href="/lien-he">{trans[1][4]}</Link>
              </Typography> */}
              {/* <Typography
                component="h2"
                className={`${activeClass("/uy-tin")}`}
              >
                <Link href="/uy-tin">Check UT</Link>
              </Typography> */}
              {["ADMIN", "MOD", "CHECKED"].includes(role) && isLogin && (
                <Typography component="h2">
                  <Link href="/dashboard">Quản lý</Link>
                </Typography>
              )}
            </Box>
            {/* <Hidden mdDown>
              <Box
                sx={{
                  border: "1px solid #fff",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 25px",
                  margin: "0 auto",
                }}
              >
                <Typography
                  component="h2"
                  sx={{ mr: 3, color: "#fff", fontSize: "14px" }}
                >
                  Các đơn vị hợp tác
                </Typography>
                <Box
                  sx={{
                    height: "37px",
                    width: "37px",
                    position: "relative",
                    mr: 3,
                  }}
                >
                  <Box
                    sx={{
                      background: `url(${logoTips.src})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",

                      height: "52px",
                      top: "50%",
                      width: "52px",
                      transform: "translateY(-50%)",
                      position: "absolute",
                    }}
                  ></Box>
                </Box>
                <Box
                  sx={{
                    background: `url(${logoTempest.src})`,
                    height: "30px",
                    width: "75px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Box>
            </Hidden> */}
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
              <ShoppingCartIcon
                sx={{ color: "#fff", transform: "scale(0.8)" }}
              />
              <Cart
                wrapperRef={wrapperRef}
                openCart={openCart}
                ids={ids}
                data={data}
                removeID={removeID}
              />
              {ids && ids?.length > 0 && (
                <Typography
                  component="h2"
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
                cursor: "pointer",
                marginRight: "50px",
                border: "1px solid #fff",
                padding: "5px 25px",
                borderRadius: "15px",
                transition: "0.3s all linear",
                display: { md: "block", sm: "none", xs: "none" },
                "&:hover": {
                  background: "#4c81427a",
                  color: "#fff",
                  borderColor: "#bfbfbfbd",
                },
              }}
            >
              {isLogin ? (
                <Typography component="h2" onClick={logout}>
                  {trans[1][6]}
                </Typography>
              ) : (
                <Typography component="h2" onClick={login}>
                  {trans[1][5]}
                </Typography>
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
