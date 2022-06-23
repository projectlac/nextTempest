import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAppContext } from "../../../context/state";
import { useRouter } from "next/router";
import Link from "next/link";
import AvatarImg from "../../../styles/assets/images/payment/avatar-cute-12.jpg";
import avatar from "../../../data/avatar";
import jwt_decode from "jwt-decode";

interface PropsMenu {
  activeMenu: () => void;
}
const AppBarAdmin = ({ activeMenu }: PropsMenu) => {
  const [listMenu, setMenu] = React.useState([
    {
      url: "/dashboard/news",
      name: "Tin tức",
    },
    {
      url: "/dashboard/history",
      name: "Lịch sử",
    },
    {
      url: "/dashboard/payment-require",
      name: "Đơn nạp",
    },
    {
      url: "/dashboard/payment-list",
      name: "Đơn mua",
    },
  ]);

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && jwt_decode<any>(token).role === "ADMIN") {
      setMenu([
        {
          url: "/dashboard/account",
          name: "Tài khoản",
        },
        {
          url: "/dashboard/news",
          name: "Tin tức",
        },
        {
          url: "/dashboard/history",
          name: "Lịch sử",
        },
        {
          url: "/dashboard/payment-require",
          name: "Đơn nạp",
        },
        {
          url: "/dashboard/payment-list",
          name: "Đơn mua",
        },
      ]);
    }
  }, []);

  const { refreshLogin } = useAppContext();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    //Logout

    //Logout
    setAnchorElUser(null);
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    refreshLogin();
    router.push("/");
  };

  // const convertIDtoIndex = () => {
  //   if (typeof window !== "undefined") {
  //     const avatarCurrency = localStorage.getItem("avatar");
  //     const index = avatar.indexOf(
  //       avatar.filter((d) => d.id === +avatarCurrency)[0]
  //     );
  //     return avatar[index].url as string;
  //   } else return AvatarImg.src;
  // };

  return (
    <AppBar position="static" sx={{ background: "#b16c4d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            onClick={activeMenu}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {listMenu.map((d, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link href={d.url} passHref>
                    <Typography textAlign="center"> {d.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {listMenu.map((d, i) => (
              <Link href={d.url} passHref key={i + "link"}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mr: 2, color: "white", display: "block" }}
                >
                  {d.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarAdmin;
