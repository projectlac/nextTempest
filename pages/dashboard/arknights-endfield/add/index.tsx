import { Box, Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import AddA9 from "../../../../components/Management/A9/DialogCommon/AddA9";

function index() {
  return (
    <DashboardLayout>
      <Head>
        <title>Quản lý tài khoản Zzz</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <AddA9 />
        </Container>
      </Box>
    </DashboardLayout>
  );
}

index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
