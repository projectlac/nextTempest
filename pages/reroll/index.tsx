import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/BaseLayout";
import BuyAccountReroll from "../../components/Modules/Shop/BuyAccountModule/BuyAccountReroll/BuyAccountReroll";

import Meta from "../../styles/assets/images/homeImage.jpg";

export default function IndexPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>
          Mua tài khoản - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower
          of fantasy uy tín hàng đầu Việt Nam
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={Meta.src} />
        <meta
          property="og:description"
          content="Tempest Shop - Mua bán tài khoản Genshin Impact, Tower of fantasy, Honkai Star Rail uy tín hàng đầu Việt Nam"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <BuyAccountReroll slug={id as string} />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
