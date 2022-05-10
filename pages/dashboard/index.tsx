import { Box } from "@mui/material";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
export default function Dashboard() {
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
    <DashboardLayout>
      <Head>
        <title>Quản lý</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>ádasdas</Box>
    </DashboardLayout>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
