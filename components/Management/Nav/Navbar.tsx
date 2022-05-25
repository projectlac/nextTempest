import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AppBarAdmin from "./AppBarAdmin";
import { Avatar, IconButton, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import Link from "next/link";

type Anchor = "left";

export default function Navbar() {
  const [state, setState] = React.useState(false);

  const decodeToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (Boolean(token)) return jwt_decode<any>(token).username;
      return "";
    }
  };

  const [menu, setMenu] = React.useState([
    {
      name: "Go to Home",
      icon: <InboxIcon />,
      link: "/",
    },
    {
      name: "Quản lý banner",
      icon: <InboxIcon />,
      link: "/dashboard/banner",
    },
    {
      name: "Quản lý Genshin",
      icon: <InboxIcon />,
      link: "/dashboard/genshin",
    },
    {
      name: "Quản lý Tags",
      icon: <InboxIcon />,
      link: "/dashboard/tags",
    },
  ]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const activeMenu = () => {
    setState(true);
  };

  const list = () => (
    <Box
      width={300}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        height={68.5}
        width={300}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <IconButton sx={{ p: 0, mr: 3 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Box>
            <Typography fontSize={13}>Xin chào:</Typography>
            <Typography fontSize={15} textTransform="capitalize">
              {decodeToken()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>
        {menu.map((text, index) => (
          <ListItem button key={index}>
            <Link href={text.link} passHref>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <AppBarAdmin activeMenu={activeMenu} />
        <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
