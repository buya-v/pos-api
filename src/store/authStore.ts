import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ApiError } from '../types';
import { mockApi } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
  failedAttempts: number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      failedAttempts: 0,

      login: async (email, password) => {
        // P0: Auth Reconstruction - Hard reset on excessive failures
        if (get().failedAttempts >= 3) {
          set({ 
            error: { 
              code: 'ERR_TOO_MANY_ATTEMPTS', 
              message: 'Account locked due to excessive failed attempts. Contact support.',
              status: 403,
              timestamp: new Date().toISOString()
            }
          });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const user = await mockApi.login(email, password);
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false, 
            error: null,
            failedAttempts: 0 // Reset on success
          });
        } catch (err: any) {
          const newAttempts = get().failedAttempts + 1;
          const apiError = err as ApiError;
          
          // P0: Explicit State Wipe on 401
          if (apiError.status === 401) {
            localStorage.removeItem('auth-storage');
          }

          set({ 
            error: apiError, 
            isLoading: false, 
            isAuthenticated: false,
            failedAttempts: newAttempts
          });
        }
      },

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({ user: null, isAuthenticated: false, error: null, failedAttempts: 0 });
      },

      resetError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
        // Note: We deliberately do not persist errors or loading state
      }),
    }
  )
);