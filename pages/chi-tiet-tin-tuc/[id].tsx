import Head from "next/head";
import React from "react";
import newsApi from "../../api/newsApi";
import Layout from "../../components/Layout/BaseLayout";
import DetailNews from "../../components/Modules/News/DetailNews";

function DetailNewsPage({ post }) {
  return (
    <Layout>
      <>
        <Head>
          <title>{post.title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            property="og:url"
            content={`https://www.tempest.nv/chi-tiet-tin-tuc/${post.slug}`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:image" content={post.imageUrl} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:alt" content={post.title} />

          <meta property="og:image:height" content="630" />
        </Head>

        <DetailNews detailNews={post} />
      </>
    </Layout>
  );
}

DetailNewsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default DetailNewsPage;

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await newsApi.getAll({ limit: 99, offset: 0 });
  const posts = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.slug },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.

  // If the route is like /posts/1, then params.id is 1
  const res = await newsApi.getNewsBySlug(params.id as string);

  const post = await res.data;

  // Pass post data to the page via props
  return { props: { post } };
}
