import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import VerifiedPage from "../../components/Modules/Verified/Verified";

import { useRouter } from "next/router";

const Verified = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <Layout>
      <Head>
        <title>Xác thực</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="../../static/32x32.ico" />
      </Head>
      <VerifiedPage token={token as string} />
    </Layout>
  );
};

export default Verified;

Verified.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
