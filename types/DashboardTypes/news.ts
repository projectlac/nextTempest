export interface NewsList {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  cloundinary: string;
  slug: string;
}

export interface DetailNewsType {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  keyword: string;
  imageUrl: string;
  content: string;
  slug: string;
}

export interface GetNews {
  limit: number;
  offset: number;
}

export type HistoryType = 'AMOUNT_TRANSFERRED'|
'CREATE_AUDIT'|
'CHANGE_STATUS_AUDIT'|
'CHANGE_ROLE'|
'BUY_ACCOUNT_BY_USER'|
'BUY_GIFT_CODE_BY_USER'|
'REFUND_ACCOUNT'|
'CONFIRM_BUY_ACCOUNT'|
'VN_PAY'|
'TRANSACTION'

export interface HistoryFilter extends GetNews {
 type?: string;
 userIdFilter?:string;
}
