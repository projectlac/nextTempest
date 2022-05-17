import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/BaseLayout";
import DetailNews from "../../components/Modules/News/DetailNews";
import newsApi from "../../api/newsApi";
import { DetailNewsType } from "../../types/DashboardTypes/news";

export default function DitailProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [detailNews, setDetailNews] = useState<DetailNewsType>({
    id: "",
    title: "",
    description: "",
    updatedAt: "",
    imageUrl: "",
    content: "",
    slug: "",
  });
  useEffect(() => {
    const getData = async () => {
      if (router.isReady) {
        // Code using query
        try {
          if (router.query) {
            newsApi
              .getNewsBySlug(id as string)
              .then((res) => setDetailNews(res.data));
          }
        } catch (error) {}
      }
    };
    getData();
  }, [router.isReady]);
  return (
    <Layout>
      <Head>
        <title>{detailNews.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://www.tempest.nv/chi-tiet-tin-tuc/${detailNews.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={detailNews.title} />
        <meta property="og:description" content={detailNews.description} />
        <meta property="og:image" content={detailNews.imageUrl} />
      </Head>

      <DetailNews detailNews={detailNews} />
    </Layout>
  );
}

DitailProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
