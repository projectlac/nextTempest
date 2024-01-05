// export enum HISTORY_FILTER {
//   AMOUNT_TRANSFERRED = "AMOUNT_TRANSFERRED",
//   CREATE_AUDIT = "CREATE_AUDIT",
//   CHANGE_STATUS_AUDIT = "CHANGE_STATUS_AUDIT",
//   CHANGE_ROLE = "CHANGE_ROLE",
//   BUY_ACCOUNT_BY_USER = "BUY_ACCOUNT_BY_USER",
//   BUY_GIFT_CODE_BY_USER = "BUY_GIFT_CODE_BY_USER",
//   REFUND_ACCOUNT = "REFUND_ACCOUNT",
//   CONFIRM_BUY_ACCOUNT = "CONFIRM_BUY_ACCOUNT",
//   VN_PAY = "VN_PAY",
//   TRANSACTION = "TRANSACTION",
// }

export const HISTORY_FILTER = [
  {id: 1, value: "AMOUNT_TRANSFERRED", label: 'Thay đổi tiền' },
  {id: 4, value: "CHANGE_ROLE", label:'Thay đổi role' },
  {id: 5, value: "BUY_ACCOUNT_BY_USER", label:'Mua tài khoản' },
  {id: 7, value: "REFUND_ACCOUNT", label:'Hoàn trả tài khoản' },
  {id: 8, value: "CONFIRM_BUY_ACCOUNT", label: 'Xác nhận giao dịch' },
  {id: 10, value: "TRANSACTION", label:'Lịch sử nạp' },
];
