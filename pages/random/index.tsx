import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/BaseLayout";
import BuyAccountReroll from "../../components/Modules/Shop/BuyAccountModule/BuyAccountReroll/BuyAccountReroll";

import Meta from "../../styles/assets/images/homeImage.jpg";

export default function IndexPage() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>
          Mua tài khoản - Tempest Shop - Mua bán tài khoản Honkai Star Rail,
          Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={Meta.src} />
        <meta
          property="og:description"
          content="Tempest Shop - Mua bán tài khoản Honkai Star Rail, Shop acc Zenless Zone Zero, Nạp thẻ tháng, Nạp đá HRS, Genshin"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <BuyAccountReroll />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
