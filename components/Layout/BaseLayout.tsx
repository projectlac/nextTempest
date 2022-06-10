import Head from "next/head";
import HeaderHome from "../Common/Header/HeaderHome";
import { MessengerChat } from "react-messenger-customer-chat";
import Social from "../Common/Social/Social";

export default function Layout({ children }) {
  return (
    <>
      <HeaderHome />
      <main>{children}</main>
      <MessengerChat pageId="103539711584646" />
      <Social />
    </>
  );
}
