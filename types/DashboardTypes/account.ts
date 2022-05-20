import { GetNews } from "./news";

export type AccountDataRole = "ADMIN" | "MOD" | "USER" | "";

export interface AccountData {
  id: string;
  username: string;
  email: string;
  role: AccountDataRole;
  money: number;
}
export interface AccountTable extends GetNews {
  role: AccountDataRole;
  username: string;
}
