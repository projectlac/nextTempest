import HeaderHome from "../Common/Header/HeaderHome";
// import { MessengerChat, showMessenger } from "react-messenger-chat-plugin";
import { Box } from "@mui/material";
import Image from "next/image";
import Footer from "../Common/Footer/Footer";
import Social from "../Common/Social/Social";
import Walker from "../Common/Walker/Walker";
import Fb from "../../styles/assets/images/fb_icon.svg";
export default function Layout({ children }) {
  return (
    <>
      <HeaderHome />
      <main>{children}</main>
      {/* <MessengerChat
        pageId="103539711584646"
        themeColor={"#b68967"}
        loggedInGreeting=""
        loggedOutGreeting=""
        language="vi_VN"
      /> */}
      <Walker />
      {/* <MessengerChat pageId="103539711584646" language="vi_VN" /> */}
      <Box
        sx={{
          width: 90,
          height: 90,
          position: "fixed",
          right: "-5px",
          bottom: "0px",
        }}
      >
        <a href={"https://m.me/103539711584646"} target="__blank">
          <Image
            src={Fb}
            alt="Facebook"
            width={60}
            height={60}
            objectFit="contain"
          />
        </a>
      </Box>
      <Social />
      <Footer />
    </>
  );
}
