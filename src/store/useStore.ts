import { create } from 'zustand';
import { Transaction, Merchant } from '../types';

interface AppState {
  currentMerchant: Merchant | null;
  transactions: Transaction[];
  isAuthenticated: boolean;
  login: (merchant: Merchant) => void;
  logout: () => void;
  addTransaction: (tx: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status'], traceId?: string) => void;
}

// Mock Initial Data
const MOCK_MERCHANT: Merchant = {
  id: 'mer_12345',
  name: 'Retail Solutions Ltd',
  email: 'admin@retailsolutions.com',
  apiKey: 'sk_live_51Mz...'
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_101',
    merchantId: 'mer_12345',
    amount: 150.00,
    currency: 'USD',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'success',
    items: [{ name: 'Widget A', price: 150, quantity: 1 }]
  },
  {
    id: 'tx_102',
    merchantId: 'mer_12345',
    amount: 45.50,
    currency: 'USD',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'danger',
    traceId: 'ae55-1234-bd99',
    items: [{ name: 'Service Fee', price: 45.50, quantity: 1 }]
  }
];

export const useStore = create<AppState>((set) => ({
  currentMerchant: null,
  transactions: [],
  isAuthenticated: false,
  login: (merchant) => set({ currentMerchant: merchant, isAuthenticated: true, transactions: MOCK_TRANSACTIONS }),
  logout: () => set({ currentMerchant: null, isAuthenticated: false, transactions: [] }),
  addTransaction: (tx) => set((state) => ({
    transactions: [tx, ...state.transactions]
  })),
  updateTransactionStatus: (id, status, traceId) => set((state) => ({
    transactions: state.transactions.map(t => 
      t.id === id ? { ...t, status, traceId } : t
    )
  }))
}));