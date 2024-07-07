import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/BaseLayout";

import CodeList from "../../components/Modules/Code/CodeList";
import Meta from "../../styles/assets/images/homeImage.jpg";

export default function IndexPage() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>
          Mua tài khoản - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower
          of fantasy uy tín hàng đầu Việt Nam
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={Meta.src} />
        <meta
          property="og:description"
          content="Tempest Shop - Mua bán tài khoản Honkai Star Rail, Shop acc Zenless Zone Zero, Reroll uy tín hàng đầu Việt Namm"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <CodeList />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
