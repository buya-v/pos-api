import { create } from 'zustand';
import { Transaction, DashboardStats } from '../types';
import { format } from 'date-fns';

interface FiscalState {
  transactions: Transaction[];
  isOnline: boolean;
  addTransaction: (amount: number) => Promise<Transaction>;
  voidTransaction: (id: string) => void;
  retryPending: () => Promise<void>;
  getStats: () => DashboardStats;
  toggleOnlineStatus: () => void;
}

// Dummy initial data
const INITIAL_DATA: Transaction[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    external_ref: 'POS-001',
    total_amount: 150.00,
    tax_amount: 30.00,
    fiscal_code: 'FIS-992831',
    lottery_code: 'LOTT-123',
    qr_data: 'https://tax.gov/verify?id=f47ac10b',
    status: 'SYNCED',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    synced_at: new Date(Date.now() - 86300000).toISOString(),
  },
  {
    id: 'a12bc34d-56ef-7890-1234-567890abcdef',
    external_ref: 'POS-002',
    total_amount: 45.50,
    tax_amount: 9.10,
    qr_data: 'https://tax.gov/verify?id=a12bc34d',
    status: 'PENDING',
    created_at: new Date().toISOString(),
  }
];

export const useFiscalStore = create<FiscalState>((set, get) => ({
  transactions: INITIAL_DATA,
  isOnline: true,

  addTransaction: async (amount: number) => {
    const isOnline = get().isOnline;
    const taxRate = 0.20;
    const taxAmount = amount - (amount / (1 + taxRate));
    
    const newTx: Transaction = {
      id: crypto.randomUUID(),
      external_ref: `POS-${Math.floor(Math.random() * 1000)}`,
      total_amount: amount,
      tax_amount: parseFloat(taxAmount.toFixed(2)),
      qr_data: `https://tax.gov/verify?id=${Date.now()}`,
      status: isOnline ? 'SYNCED' : 'PENDING',
      created_at: new Date().toISOString(),
      fiscal_code: isOnline ? `FIS-${Math.floor(Math.random() * 1000000)}` : undefined,
      lottery_code: isOnline ? `LOTT-${Math.floor(Math.random() * 1000)}` : undefined,
      synced_at: isOnline ? new Date().toISOString() : undefined,
    };

    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));

    set(state => ({
      transactions: [newTx, ...state.transactions]
    }));

    return newTx;
  },

  voidTransaction: (id: string) => {
    set(state => ({
      transactions: state.transactions.map(t => 
        t.id === id ? { ...t, status: 'VOID' as const } : t
      )
    }));
  },

  retryPending: async () => {
    // Simulate batch processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set(state => ({
      transactions: state.transactions.map(t => {
        if (t.status === 'PENDING') {
          return {
            ...t,
            status: 'SYNCED',
            fiscal_code: `FIS-${Math.floor(Math.random() * 1000000)}`,
            lottery_code: `LOTT-${Math.floor(Math.random() * 1000)}`,
            synced_at: new Date().toISOString()
          };
        }
        return t;
      })
    }));
  },

  toggleOnlineStatus: () => set(state => ({ isOnline: !state.isOnline })),

  getStats: () => {
    const { transactions } = get();
    const validTx = transactions.filter(t => t.status !== 'VOID');
    
    return {
      totalSales: validTx.reduce((acc, t) => acc + t.total_amount, 0),
      totalVAT: validTx.reduce((acc, t) => acc + t.tax_amount, 0),
      pendingCount: transactions.filter(t => t.status === 'PENDING').length,
      transactionCount: validTx.length,
    };
  }
}));