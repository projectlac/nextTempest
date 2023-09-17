import Head from "next/head";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DashboardIndex from "../../components/Management/Dashboard/DashboardIndex";
export default function Dashboard() {
  return (
    <DashboardLayout>
      <Head>
        <title>Quản lý</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DashboardIndex />
    </DashboardLayout>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
