export type AccountDataRole = "admin" | "mod" | "user";

export interface AccountData {
  id: string;
  name: string;
  email: string;
  role: AccountDataRole;
  smileCoin: string;
}
