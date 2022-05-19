export interface Pack {
  name: string;
  price: string;
  image: string;
  quantily: number;
  id: string;
}
export interface PackForm {
  UID: string;
  server: string;
  username: string;
  password: string;
  accountName: string;
  phone: string;
  note: string;
  auditInformation: AuditInformation[];
}
export interface AuditInformation {
  name: string;
  quantity: number;
  unitPrice: number;
}
