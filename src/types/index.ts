export interface TransactionItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface TransactionPayload {
  items: TransactionItem[];
  totalAmount: number;
  timestamp: string;
}

export interface Transaction extends TransactionPayload {
  id: string;
  status: 'PENDING' | 'REGISTERED' | 'VOIDED' | 'SYNCING';
  fiscalCode?: string;
  qrCodeUrl?: string;
}

export type AuthState = 'IDLE' | 'AUTHENTICATED' | 'ERROR' | 'LOOP_DETECTED';

export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'CASHIER';
}