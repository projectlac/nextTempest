import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import PaymentBox from "../../components/Modules/Payment/PaymentBox";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Nạp tiền</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PaymentBox />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
