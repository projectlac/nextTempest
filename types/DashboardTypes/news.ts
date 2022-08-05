export interface NewsList {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  cloundinary: string;
  slug: string;
}

export interface DetailNewsType {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  keyword: string;
  imageUrl: string;
  content: string;
  slug: string;
}

export interface GetNews {
  limit: number;
  offset: number;
}
