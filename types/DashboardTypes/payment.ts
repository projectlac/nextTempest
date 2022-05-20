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
