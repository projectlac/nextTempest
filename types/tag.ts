export interface IUpdateTag {
  title: string;
  content: {};
  type: string;
}
export interface IAddTag extends IUpdateTag {
  game: string;
}
export interface IDeleteMulti {
  ids: string[];
}
export interface IGetForm {
  limit: number;
  offset: number;
}
