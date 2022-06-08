export type CryptoOrderStatus = "COMPLETED" | "PENDING" | "failed";

export interface CryptoOrder {
  updatedAt: string;
  UID: string;
  server: string;
  username: string;
  password: number;
  accountName: string;
  phone: number;
  note: string;
  total: number;
  status: CryptoOrderStatus;
  auditInformations: PackInfor[];
  user: string;
  id: string;
}
export interface PackInfor {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
export interface CryptoOrderPaymentItem extends CryptoOrder {
  information: PaymentItem;
}
export interface PaymentItem {
  accounts: AccountInfor[];
  gmail: string;
  others: string;
  social: string;
  phone: string;
}
export interface AccountInfor {
  code: string;
  newPrice: string;
  server: string;
}
