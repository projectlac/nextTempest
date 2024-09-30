import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout/BaseLayout";
import SubmitBuyTof from "../../../components/Modules/SubmitBuyTof/SubmitBuyTof";

export default function IndexPage() {
  const router = useRouter();
  const { id, redirect } = router.query;

  return (
    <Layout>
      <Head>
        <title>
          Thanh toán - Tempest Shop - Nạp thẻ tháng Honkai - Mộng ước - Nạp thẻ
          uy tín, BP, shop HSR
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SubmitBuyTof ids={id as string} slug={redirect as string} />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
