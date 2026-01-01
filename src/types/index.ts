export type UserRole = 'admin' | 'merchant' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  merchantId: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
  timestamp: string;
}

export interface FiscalStatus {
  isConnected: boolean;
  lastSync: string;
  pendingTransactions: number;
  fiscalId: string;
  status: 'healthy' | 'degraded' | 'offline';
}

export interface Transaction {
  id: string;
  amount: number;
  vat: number;
  timestamp: string;
  qrCode: string;
  status: 'synced' | 'pending' | 'voided';
}