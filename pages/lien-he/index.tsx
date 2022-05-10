import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import Contact from "../../components/Modules/Contact/Contact";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Liên hệ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Contact />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
