import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import logo from "../../../styles/assets/images/Logo/logoWithoutGame.png";
import logoTempest from "../../../styles/assets/images/tempestlogo-2.png";
import logoTips from "../../../styles/assets/images/Logo-tnf-2.png";
import Close from "../../../styles/assets/images/svg/close.svg";
import { useAppContext } from "../../../context/state";
import useTrans from "../../../pages/hook/useTrans";
import { log } from "console";
import { GAME } from "../../../utility/constain";
interface PropsMenu {
  activeMenu: boolean;
  closeMenu: () => void;
  login: () => void;
  logout: () => void;
}
const MenuSWrapper = styled(Box)(
  ({ theme }) => `
    position: fixed;
    width: 350px;
    top: 0;
    left: 0;
    background: #6e6e6ee6;
    z-index: 1000;
    height: 100vh;
    padding: 15px 35px;
    text-align:center;
    transform:translateX(-350px);
    transition: all 0.3s linear;
    `
);

const OverlayMenu = styled(Box)(
  ({ theme }) => `
  width: 100%;
  height: 100vh;
  position: fixed;
  background: #000000c7;
  z-index: 999;
    `
);
const MenuTextBox = styled(Box)(
  ({ theme }) => `
        color:#fff;
        text-align:left;
      `
);
const FrameBox = styled(Box)(
  ({ theme }) => `
  position: relative;
  justify-content: center;
  min-height: calc(100vh - 16px);
  border: 24px double orange;
  -o-border-image: url(data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0RUUzRTg3QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0RUUzRTg4QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTRFRTNFODVDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTRFRTNFODZDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67RPKfAAAHHElEQVR42uxdWXPiOBBuG3MOQw4YNse8pLbmYf//j9nah615mRzDJDAhxNx4UVVrabps0GUgoK9KFWOILH1utb6WZDlIkgQOAH/l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) 38 round;
  border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0RUUzRTg3QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0RUUzRTg4QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTRFRTNFODVDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTRFRTNFODZDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67RPKfAAAHHElEQVR42uxdWXPiOBBuG3MOQw4YNse8pLbmYf//j9nah615mRzDJDAhxNx4UVVrabps0GUgoK9KFWOILH1utb6WZDlIkgQOAH/l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) 38 round;
  box-sizing: border-box;
  align-items: center;`
);

const ChildMenu = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  fontSize: "15px",

  "& a": {
    padding: "10px",

    display: "block",
    "&.active": {
      background: "#fff",
      color: "#000",
      borderRadius: "30px",
    },
  },
});
function MenuBox({ activeMenu, closeMenu, login, logout }: PropsMenu) {
  const router = useRouter();
  const { isLogin, refreshLogin, role } = useAppContext();
  const trans = useTrans();

  const activeClass = (pathName: string) => {
    if (router.pathname === pathName) return "active";
    else {
      if (pathName !== "/") {
        if (router.asPath.includes(pathName)) return "active";
        return "";
      }
    }
  };

  return (
    <>
      <MenuSWrapper
        sx={{
          transform: `${activeMenu ? "translateX(0)" : "translateX(-350px)"}`,
        }}
      >
        {" "}
        <FrameBox>
          <Box
            sx={{ position: "absolute", right: "-13px" }}
            onClick={closeMenu}
          >
            <Image src={Close} alt="" width={25} height={25} />
          </Box>

          <Image src={logo} alt="" width={200} height={67} />
          <Divider
            sx={{
              borderColor: "#fff",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          />
          <MenuTextBox
            sx={{
              "& .MuiTypography-root": {
                padding: "15px 0",
                fontSize: "15px",
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
              <Link href="/">{trans[1][0]}</Link>
            </Typography>
            <Box>
              <span style={{ fontSize: "15px" }}>{trans[1][1]}</span>
              <ChildMenu>
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
                  <a className={`${activeClass("/genshin-impact")}`}>
                    Genshin impact
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: "/mua-tai-khoan/[id]",
                    query: {
                      id: "wuthering-waves",
                      search: "VIP,NEW",
                      page: "1",
                    },
                  }}
                >
                  <a className={`${activeClass("/wuthering-waves")}`}>
                    Wuthering Waves
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: "/mua-tai-khoan/[id]",
                    query: {
                      id: GAME.ZZZ,
                      search: "VIP,NEW",
                      page: "1",
                    },
                  }}
                >
                  <a className={`${activeClass("/zenless-zone-zero")}`}>
                    Zenless Zone Zero
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: "/mua-tai-khoan/[id]",
                    query: { id: "tower-of-fantasy" },
                  }}
                >
                  <a className={`${activeClass("/tower-of-fantasy")}`}>
                    Tower of fantasy
                  </a>
                </Link>
                <Link href="/reroll">
                  <a className={`${activeClass("/reroll")}`}>Reroll</a>
                </Link>
                <Link href="/random">
                  <a className={`${activeClass("/random")}`}>Random</a>
                </Link>
              </ChildMenu>
            </Box>

            {/* <Typography className={`${activeClass("/tin-tuc")}`}>
              <Link href="/tin-tuc">{trans[1][2]}</Link>
            </Typography> */}
            <Typography className={`${activeClass("/nap-tien")}`}>
              <Link href="/nap-tien">{trans[1][3]}</Link>
            </Typography>
            <Typography>
              <a
                href="https://www.facebook.com/tempest.goods?locale=vi_VN"
                target="__blank"
              >
                Order Goods & Doll
              </a>
            </Typography>
            {/* <Typography className={`${activeClass("/lien-he")}`}>
              <Link href="/lien-he">{trans[1][4]}</Link>
            </Typography> */}
            {/* <Typography className={`${activeClass("/uy-tin")}`}>
              <Link href="/uy-tin">Check UT</Link>
            </Typography> */}
            {["ADMIN", "MOD", "CHECKED"].includes(role) && isLogin && (
              <Typography component="h2">
                <Link href="/dashboard">Quản lý</Link>
              </Typography>
            )}
            {isLogin ? (
              <Typography
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                {trans[1][6]}
              </Typography>
            ) : (
              <Typography
                onClick={() => {
                  login();
                  closeMenu();
                }}
              >
                {trans[1][5]}
              </Typography>
            )}
          </MenuTextBox>

          {/* <Box
            sx={{
              border: "1px solid #fff",
              borderRadius: "30px",

              alignItems: "center",
              justifyContent: "center",
              padding: "10px 25px",
              margin: "0 auto",
            }}
          >
            <Typography sx={{ mr: 3, color: "#fff", fontSize: "14px" }}>
              Các đơn vị hợp tác
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  background: `url(${logoTips.src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",

                  height: "52px",

                  width: "52px",
                }}
              ></Box>

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
          </Box> */}
        </FrameBox>
      </MenuSWrapper>
      {activeMenu && <OverlayMenu />}
    </>
  );
}

export default MenuBox;
