import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import PaymentBox from "../../components/Modules/Payment/PaymentBox";
import Meta from "../../styles/assets/images/homeImage.jpg";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>
          Nạp tiền - Tempest Shop - Mua bán tài khoản Honkai Star Rail, Zenless
          Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin
        </title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={Meta.src} />
        <meta
          property="og:description"
          content="Tempest Shop - Mua bán tài khoản Honkai Star Rail, Shop acc Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <PaymentBox />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
