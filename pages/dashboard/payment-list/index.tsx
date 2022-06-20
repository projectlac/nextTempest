import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import DataPaymentList from "../../../components/Management/PaymentList/Table/DataPaymentList";

function PaymentRequire() {
  return (
    <DashboardLayout>
      <Head>
        <title>Yêu cầu mua</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <DataPaymentList />
      </Container>
    </DashboardLayout>
  );
}

export default PaymentRequire;
PaymentRequire.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
