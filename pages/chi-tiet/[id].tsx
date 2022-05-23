import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout/BaseLayout";
import DetailAccountModule from "../../components/Modules/Shop/DetailAccountModule/DetailAccountModule";

export default function DetailProduct() {
  return (
    <Layout>
      <Head>
        <title>Chi tiết</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DetailAccountModule />
    </Layout>
  );
}

DetailProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
