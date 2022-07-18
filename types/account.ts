import { PackHistoryOfAccount } from "./DashboardTypes/packManagement";

export interface AccountForm extends PackHistoryOfAccount {
  weapon: string;
  character: string;
  server: string;
  sort: number;
  queryString: string;
  startPrice?: number;
  endPrice?: number;
  isSold?:boolean
}

export enum TAG_TYPE {
  SERVER = "SERVER",
  CHARACTER = "CHARACTER",
  WEAPON = "WEAPON",
}

export interface IBuy {
  ids: string[];
  phone: string;
  gmail: string;
  social: string;
  others: string;
}
