import { Box, Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import DataWw from "../../../components/Management/Ww/Table/DataWw";

function index() {
  return (
    <DashboardLayout>
      <Head>
        <title>Quản lý tài khoản WW</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <DataWw />
        </Container>
      </Box>
    </DashboardLayout>
  );
}

index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
