import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import PaymentBox from "../../components/Modules/Payment/PaymentBox";
import Meta from "../../styles/assets/images/newsDes/HotNews.png";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Nạp tiền</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={Meta.src} />
        <meta
          property="og:description"
          content="Tempest Genshin nơi cung cấp tài khoản, Nạp game an toàn nhất Việt Nam"
        />
      </Head>
      <PaymentBox />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
