import * as React from "react";
import { InferGetStaticPropsType } from "next";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import { IPost } from "../types";
import Layout from "../components/Layout/BaseLayout";
import ModuleVideo from "../components/Modules/ModuleVideo";
import Head from "next/head";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Trang chủ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ModuleVideo />
    </Layout>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
