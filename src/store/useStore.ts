import { create } from 'zustand';
import { LogEntry, Rfc7807Error } from '../types';

interface AppState {
  logs: LogEntry[];
  fiscalStatus: 'connected' | 'disconnected' | 'warning';
  globalError: Rfc7807Error | null;
  
  addLog: (log: Omit<LogEntry, 'id'>) => void;
  setFiscalStatus: (status: 'connected' | 'disconnected' | 'warning') => void;
  setGlobalError: (error: Rfc7807Error | null) => void;
  clearLogs: () => void;
}

export const useStore = create<AppState>((set) => ({
  logs: [],
  fiscalStatus: 'warning',
  globalError: null,

  addLog: (log) => set((state) => ({
    logs: [
      { ...log, id: Math.random().toString(36).substring(7) },
      ...state.logs
    ].slice(0, 50) // Keep last 50 requests per Priority 3
  })),

  setFiscalStatus: (status) => set({ fiscalStatus: status }),
  
  setGlobalError: (error) => set({ globalError: error }),
  
  clearLogs: () => set({ logs: [] })
}));