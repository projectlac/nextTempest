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
          title: `Mua tài khoản - Tempest Shop - Mua bán, Nạp thẻ tháng, Nạp đá HRS, Genshin`,
          desc: "Tempest Shop - Mua bán tài khoản Honkai Star Rail, Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin",
        };
      case "honkai-star-rail":
        return {
          title: `Mua tài khoản - Tempest Shop - Shop Acc Mua bán tài khoản Honkai star rail uy tín, chất lương`,
          desc: "Tempest Shop - Mua bán tài khoản Honkai Star Rail, Shop acc Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin",
        };
      case "tower-of-fantasy":
        return {
          title: `Mua tài khoản - Tempest Shop - Mua bán, Nạp thẻ tháng, Nạp đá HRS, Genshin`,
          desc: "Tempest Shop - Mua bán tài khoản Honkai Star Rail, Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin",
        };
      case "wuthering-waves":
        return {
          title: `Mua tài khoản - Tempest Shop - Mua bán, Nạp thẻ tháng, Nạp đá HRS, Genshin`,
          desc: "Tempest Shop - Mua bán tài khoản Honkai Star Rail, Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin",
        };
      default:
        return {
          title: `Mua tài khoản - Tempest Shop - Mua bán, Nạp thẻ tháng, Nạp đá HRS, Genshin`,
          desc: "Tempest Shop - Mua bán tài khoản Honkai Star Rail, Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin",
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
