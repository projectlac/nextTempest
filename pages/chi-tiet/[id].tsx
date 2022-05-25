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
        <title>{post.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
