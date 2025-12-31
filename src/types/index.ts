export type TransactionStatus = 'SYNCED' | 'PENDING' | 'ERROR' | 'VOID';

export interface Transaction {
  id: string;
  external_ref: string;
  total_amount: number;
  tax_amount: number;
  fiscal_code?: string;
  lottery_code?: string;
  qr_data: string;
  status: TransactionStatus;
  created_at: string;
  synced_at?: string;
}

export interface DashboardStats {
  totalSales: number;
  totalVAT: number;
  pendingCount: number;
  transactionCount: number;
}