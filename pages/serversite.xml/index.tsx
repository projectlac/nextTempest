import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import newsApi from "../../api/newsApi";
import tagApi from "../../api/tag";

export const GetProduct = async () => {
  const data = await tagApi.getAccount({
    character: "",
    limit: 99999,
    offset: 0,
    server: "",
    sort: null,
    weapon: "",
  });

  return data.data.data;
};

export const GetPost = async () => {
  const data = await newsApi.getAll({
    limit: 99999,
    offset: 0,
  });

  return data.data.data;
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = "https://www.tempest.vn";
  const data: any = await GetProduct();
  const news: any = await GetPost();
  const fieldsProduct: ISitemapField[] = data?.map((data: any) => ({
    loc: `${siteUrl}/chi-tiet/${data.slug}`,
    lastmod: new Date().toISOString(),
  }));
  const fieldsNews: ISitemapField[] = news?.map((data: any) => ({
    loc: `${siteUrl}/chi-tiet-tin-tuc/${data.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = fieldsNews.concat(fieldsProduct);

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {
  //console
}
