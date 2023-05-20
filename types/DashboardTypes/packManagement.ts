export interface PackFormManagement {
  limit: number;
  offset: number;
  status: string;
  queryString: string;
  type:"ACCOUNT_SAME_PRICE"| "ACCOUNT"
}
export interface PackHistoryOfAccount {
  limit: number;
  offset: number;
}
export interface PackFormReturn {
  UID: string;
  server: string;
  username: string;
  password: string;
  accountName: string;
  phone: string;
  note: string;
  auditInformation: AuditInformation[];
  total: number;
  updatedAt: string;
  user: UserPackReturn;
  status: string;
}
export interface AuditInformation {
  name: string;
  quantity: number;
  total: number;
  unitPrice: number;
}
export interface UserPackReturn {
  username: string;
}
