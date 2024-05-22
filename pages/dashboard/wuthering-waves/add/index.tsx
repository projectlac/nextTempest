import { Box, Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import AddWw from "../../../../components/Management/Ww/DialogCommon/AddWw";

function index() {
  return (
    <DashboardLayout>
      <Head>
        <title>Quản lý tài khoản ww</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <AddWw />
        </Container>
      </Box>
    </DashboardLayout>
  );
}

index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
