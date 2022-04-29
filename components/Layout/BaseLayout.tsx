import Head from "next/head";
import HeaderHome from "../Common/Header/HeaderHome";
import Meta from "../../styles/assets/images/newsDes/HotNews.png";
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta property="og:image" content={Meta.src} />
      </Head>
      <HeaderHome />
      <main>{children}</main>
    </>
  );
}
