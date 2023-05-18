import { Box, Container } from "@mui/material";
import Head from "next/head";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import DataHsr from "../../../../components/Management/Hsr/HrsRandom/Table/DataHsr";

function index() {
  return (
    <DashboardLayout>
      <Head>
        <title>Quản lý tài khoản Genshin</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <DataHsr />
        </Container>
      </Box>
    </DashboardLayout>
  );
}

index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
