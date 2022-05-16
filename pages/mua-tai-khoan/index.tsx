import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout/BaseLayout";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Mua tài khoản</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      mua toai khoan
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
