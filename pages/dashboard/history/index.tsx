import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

function History() {
  return (
    <DashboardLayout>
      <Head>
        <title>Lịch sử</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      History
    </DashboardLayout>
  );
}

export default History;
History.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
