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
          Thanh toán - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower of
          fantasy uy tín hàng đầu Việt Nam
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
