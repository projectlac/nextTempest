import Head from "next/head";
import HeaderHome from "../Common/Header/HeaderHome";
import { MessengerChat } from "react-messenger-chat-plugin";

export default function Layout({ children }) {
  return (
    <>
      <HeaderHome />
      <main>{children}</main>
      <MessengerChat
        pageId="1414878472106416"
        themeColor={"#b68967"}
        loggedInGreeting=""
        loggedOutGreeting=""
        language="vi_VN"
      />
    </>
  );
}
