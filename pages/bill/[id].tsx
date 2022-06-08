import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import Bill from "../../components/Modules/Bill/Bill";

export default function IndexPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>Hóa đơn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Bill id={id as string} />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
