import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout/BaseLayout";

export default function DetailProduct() {
  return (
    <Layout>
      <Head>
        <title>Mua tài khoản</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      Chi tiết tài khoản
    </Layout>
  );
}

DetailProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
