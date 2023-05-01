import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import SliderBox from "../../components/Modules/SliderBox";
import Meta from "../../styles/assets/images/homeImage.jpg";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>
          Tin tức - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower of
          fantasy uy tín hàng đầu Việt Nam
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:image" content={Meta.src} />
        <meta
          property="og:description"
          content="Tempest Shop - Mua bán tài khoản Honkai Star Rail, Shop acc Honkai Star Rail VIP, Reroll uy tín hàng đầu Việt Namm"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <SliderBox />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
