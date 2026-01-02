import { create } from 'zustand';
import { Transaction, TransactionPayload } from '../types';

interface TransactionStore {
  transactions: Transaction[];
  activeTransaction: TransactionPayload | null;
  isModalOpen: boolean;
  isLoading: boolean;
  initTransaction: () => void;
  closeTransaction: () => void;
  submitTransaction: (payload: TransactionPayload) => Promise<void>;
  voidTransaction: (id: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  activeTransaction: null,
  isModalOpen: false,
  isLoading: false,
  
  initTransaction: () => {
    // REQ-8.1: Clear stale data before opening
    set({
      activeTransaction: {
        items: [],
        totalAmount: 0,
        timestamp: new Date().toISOString()
      },
      isModalOpen: true
    });
  },
  
  closeTransaction: () => {
    set({ isModalOpen: false, activeTransaction: null });
  },
  
  submitTransaction: async (payload: TransactionPayload) => {
    set({ isLoading: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTransaction: Transaction = {
      ...payload,
      id: Math.random().toString(36).substr(2, 9),
      status: 'REGISTERED',
      fiscalCode: 'FISCAL-' + Math.floor(Math.random() * 10000),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FISCAL-RECEIPT'
    };
    
    set(state => ({
      transactions: [newTransaction, ...state.transactions],
      isLoading: false,
      isModalOpen: false,
      activeTransaction: null
    }));
  },

  voidTransaction: (id: string) => {
    set(state => ({
      transactions: state.transactions.map(t => 
        t.id === id ? { ...t, status: 'VOIDED' } : t
      )
    }));
  }
}));