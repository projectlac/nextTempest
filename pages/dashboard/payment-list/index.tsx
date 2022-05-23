import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import DataPayment from "../../../components/Management/PaymentOrder/Table/DataPayment";

function PaymentRequire() {
  return (
    <DashboardLayout>
      <Head>
        <title>Yêu cầu nạp</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <DataPayment />
      </Container>
    </DashboardLayout>
  );
}

export default PaymentRequire;
PaymentRequire.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
