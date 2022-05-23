import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout/BaseLayout";
import BuyAccountModule from "../../components/Modules/Shop/BuyAccountModule/BuyAccountModule";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Mua tài khoản</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BuyAccountModule />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
