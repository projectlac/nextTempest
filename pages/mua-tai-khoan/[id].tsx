import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout/BaseLayout";
import BuyAccountModule from "../../components/Modules/Shop/BuyAccountModule/BuyAccountModule";
import Meta from "../../styles/assets/images/homeImage.jpg";

export default function IndexPage() {
  const router = useRouter();
  const { id, search } = router.query;

  const renderSeo = (id) => {
    switch (id) {
      case "genshin-impact":
        return {
          title: `Mua tài khoản - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower
        of fantasy uy tín hàng đầu Việt Nam`,
          desc: "Tempest Shop - Mua bán tài khoản Genshin Impact, Tower of fantasy, Honkai Star Rail uy tín hàng đầu Việt Nam",
        };
      case "honkai-star-rail":
        return {
          title: `Mua tài khoản - Tempest Shop - Shop Acc Mua bán tài khoản Honkai star rail uy tín, chất lương`,
          desc: "Tempest Shop - Mua bán tài khoản Honkai Star Rail, Shop acc Honkai Star Rail VIP, Reroll uy tín hàng đầu Việt Namm",
        };
      case "tower-of-fantasy":
        return {
          title: `Mua tài khoản - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower
          of fantasy uy tín hàng đầu Việt Nam`,
          desc: "Tempest Shop - Mua bán tài khoản Genshin Impact, Tower of fantasy, Honkai Star Rail uy tín hàng đầu Việt Nam",
        };
      default:
        return {
          title: `Mua tài khoản - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower
        of fantasy uy tín hàng đầu Việt Nam`,
          desc: "Tempest Shop - Mua bán tài khoản Genshin Impact, Tower of fantasy, Honkai Star Rail uy tín hàng đầu Việt Nam",
        };
    }
  };
  return (
    <Layout>
      <Head>
        <title>{renderSeo(id).title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={Meta.src} />
        <meta property="og:description" content={renderSeo(id).desc} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <BuyAccountModule slug={id as string} type={search as string} />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
