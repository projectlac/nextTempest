import Head from "next/head";
import * as React from "react";
import Layout from "../components/Layout/BaseLayout";
import ModuleVideo from "../components/Modules/ModuleVideo";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Trang chủ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ModuleVideo />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
