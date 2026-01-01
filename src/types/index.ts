export type TransactionStatus = 'success' | 'warning' | 'danger';

export interface Transaction {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: TransactionStatus;
  traceId?: string;
  items: Array<{ name: string; price: number; quantity: number }>;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  apiKey: string;
}

export interface ApiError {
  error: string;
  code: string;
  traceId: string;
  context: string;
}