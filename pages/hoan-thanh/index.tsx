import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import Completed from "../../components/Modules/Completed";
import SliderBox from "../../components/Modules/SliderBox";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Hoàn thành</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Completed />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
