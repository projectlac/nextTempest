export interface NewsList {
  id: string;
  name: string;
  image: string;
  description: string;
  body: string;
  created: string;
}
export interface GetNews {
  limit: number;
  offset: number;
}
