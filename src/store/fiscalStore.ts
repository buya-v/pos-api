import { create } from 'zustand';
import { HealthCheck, Transaction, ProblemDetails, ServiceStatus } from '../types';
import { generateMockError, generateTransaction } from '../utils/mockApi';

interface FiscalState {
  health: HealthCheck[];
  transactions: Transaction[];
  logs: ProblemDetails[];
  simulateError: boolean;
  refreshHealth: () => void;
  addTransaction: (amount: number) => Promise<void>;
  toggleSimulation: () => void;
}

export const useFiscalStore = create<FiscalState>((set, get) => ({
  health: [
    { service: 'API_GATEWAY', status: 'operational', latencyMs: 12, lastChecked: new Date().toISOString() },
    { service: 'DB_CONNECTION', status: 'operational', latencyMs: 4, lastChecked: new Date().toISOString() },
    { service: 'TAX_AUTHORITY', status: 'operational', latencyMs: 145, lastChecked: new Date().toISOString() },
    { service: 'VAULT', status: 'operational', latencyMs: 8, lastChecked: new Date().toISOString() },
  ],
  transactions: [],
  logs: [],
  simulateError: false,

  toggleSimulation: () => set(state => ({
    simulateError: !state.simulateError,
    health: state.health.map(h => 
      h.service === 'TAX_AUTHORITY' 
        ? { ...h, status: !state.simulateError ? 'down' : 'operational', latencyMs: !state.simulateError ? 5000 : 145 }
        : h
    )
  })),

  refreshHealth: () => {
    const { simulateError } = get();
    set(state => ({
      health: state.health.map(h => ({
        ...h,
        latencyMs: Math.floor(Math.random() * 50) + 10,
        lastChecked: new Date().toISOString(),
        status: (simulateError && h.service === 'TAX_AUTHORITY') ? 'down' : 'operational'
      }))
    }));
  },

  addTransaction: async (amount: number) => {
    const { simulateError } = get();
    
    // Simulate API Delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (simulateError || amount < 0) {
      const error = generateMockError(
        amount < 0 ? 422 : 503, 
        amount < 0 ? 'Validation Error' : 'Service Unavailable'
      );
      set(state => ({ logs: [error, ...state.logs] }));
      throw error;
    }

    const newTx = generateTransaction(amount);
    set(state => ({
      transactions: [newTx, ...state.transactions]
    }));
  }
}));