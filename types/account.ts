import { PackHistoryOfAccount } from "./DashboardTypes/packManagement";

export interface AccountForm extends PackHistoryOfAccount {
  weapon: string;
  character: string;
  server: string;
}
