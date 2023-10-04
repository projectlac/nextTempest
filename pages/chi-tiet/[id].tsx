import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import tagApi from "../../api/tag";
import Layout from "../../components/Layout/BaseLayout";
import DetailAccountModule from "../../components/Modules/Shop/DetailAccountModule/DetailAccountModule";

export default function DetailProduct({ post }) {
  return (
    <Layout>
      <Head>
        <title>
          {post.name} - Tempest Shop - Mua bán tài khoản Genshin Impact, Tower
          of fantasy uy tín hàng đầu Việt Nam
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.name || "Tempest"} />
        <meta
          property="og:description"
          content={`Thông tin account ${post.name}`}
        />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:image:alt" content={post.name} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <DetailAccountModule data={post} />
    </Layout>
  );
}

DetailProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await tagApi.getAccountBySlug(id as string);

  const post = await res.data;

  return { props: { post } };
}
