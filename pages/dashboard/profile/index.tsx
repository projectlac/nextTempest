import { Box, Container } from "@mui/material";
import Head from "next/head";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Profile from "../../../components/Management/Profile/Profile";
function index() {
  return (
    <DashboardLayout>
      <Head>
        <title>Hồ sơ cá nhân</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <Profile />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
