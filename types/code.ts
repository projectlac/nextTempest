export interface ICodeCategoryDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  name: string;
  slug: string;
  description: null;
  price: string;
  amount: string;
  type: null;
  image: string;
  game: IGameDetail;
}

interface IGameDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  title: string;
  slug: string;
  type: string;
}
