export interface AuditForm {
  username: string;
  typeAudit: string;
  amountTransferred: number;
  typeTransfer: string;
}
export interface EditRoleForm {
  username: string;
  role: string;
}
export interface IManagement{
  startDate:string,
  endDate:string
}