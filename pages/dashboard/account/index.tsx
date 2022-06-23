import { Box, Container } from "@mui/material";
import Head from "next/head";

import DashboardLayout from "../../../components/Layout/DashboardLayout";
import DataAccount from "../../../components/Management/Account/Table/DataAccount";
import jwt_decode from "jwt-decode";
import React from "react";
import { useRouter } from "next/router";

function AccountIndex() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if ((token && jwt_decode<any>(token).role !== "ADMIN") || !token) {
      alert("Bạn không có quyền vào mục này");
      router.push("/dashboard");
    }
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>Quản lý tài khoản</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <DataAccount />
        </Container>
      </Box>
    </DashboardLayout>
  );
}

AccountIndex.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default AccountIndex;
