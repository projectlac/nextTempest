export interface NewsList {
  id: string;
  title: string;
  // image: string;
  description: string;
  // body: string;
  updatedAt: string;
}
export interface GetNews {
  limit: number;
  offset: number;
}
