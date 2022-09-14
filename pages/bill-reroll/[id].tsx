import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/BaseLayout";
import BillReroll from "../../components/Modules/Bill/BillReroll";

export default function IndexPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>Hóa đơn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BillReroll id={id as string} />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
