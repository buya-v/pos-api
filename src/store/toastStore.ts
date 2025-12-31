import { create } from 'zustand';
import { ApiError } from '../types';

interface ToastState {
  error: ApiError | null;
  showError: (error: ApiError) => void;
  clearError: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  error: null,
  showError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));