export interface IUpdateTag {
  title: string;
  content: {};
  type: string;
}
export interface IAddTag extends IUpdateTag {
  game: string;
}
