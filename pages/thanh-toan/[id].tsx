import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import SliderBox from "../../components/Modules/SliderBox";
import SubmitBuy from "../../components/Modules/SubmitBuy/SubmitBuy";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Thanh toán</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SubmitBuy />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
