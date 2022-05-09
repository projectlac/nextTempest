import { Box } from "@mui/material";
import Head from "next/head";
import * as React from "react";
import Layout from "../../components/Layout/BaseLayout";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
export default function IndexPage() {
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (
      (token &&
        jwt_decode<any>(token).role !== "ADMIN" &&
        jwt_decode<any>(token).role !== "MOD") ||
      !token
    ) {
      router.push("/");
    }
  }, []);
  return (
    <Layout>
      <Head>
        <title>Nạp tiền</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>ádasdas</Box>
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
