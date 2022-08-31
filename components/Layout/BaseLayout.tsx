import Head from "next/head";
import HeaderHome from "../Common/Header/HeaderHome";
// import { MessengerChat, showMessenger } from "react-messenger-chat-plugin";
import Social from "../Common/Social/Social";
import MessengerChat from "react-messenger-customer-chat";
import Footer from "../Common/Footer/Footer";
import Walker from "../Common/Walker/Walker";
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
      {/* <Walker /> */}
      <MessengerChat pageId="103539711584646" language="vi_VN" />

      <Social />
      <Footer />
    </>
  );
}
