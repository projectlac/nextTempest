import { Box, Container } from "@mui/material";
import Head from "next/head";

import { useRouter } from "next/router";
import React from "react";
import audit from "../../../api/audit";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import DataAccount from "../../../components/Management/Account/Table/DataAccount";

function AccountIndex() {
  const router = useRouter();

  React.useEffect(() => {
    const fetch = async () => {
      const res = await audit.getProfile();
      if (res && res.data.role !== "ADMIN") {
        alert("Bạn không có quyền vào mục này");
        router.push("/dashboard");
      }
    };
    fetch();
  }, [router]);

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
