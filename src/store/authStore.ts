import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

interface AuthStore {
  user: User | null;
  token: string | null;
  status: AuthState;
  failureCount: number;
  login: (username: string) => Promise<void>;
  logout: () => void;
  resetAuthSession: () => void;
  incrementFailure: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      status: 'IDLE',
      failureCount: 0,
      login: async (username: string) => {
        try {
          // Simulate API Handshake
          console.group('Auth Handshake');
          console.log('Initiating login for:', username);
          
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock successful response
          const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
          
          console.log('Token received:', mockToken.substring(0, 10) + '...');
          
          set({
            user: { id: 'u1', username, role: 'ADMIN' },
            token: mockToken,
            status: 'AUTHENTICATED',
            failureCount: 0
          });
          console.log('State hydrated successfully');
          console.groupEnd();
        } catch (e) {
          console.error('Auth Failure');
          get().incrementFailure();
          set({ status: 'ERROR' });
          console.groupEnd();
        }
      },
      logout: () => set({ user: null, token: null, status: 'IDLE', failureCount: 0 }),
      incrementFailure: () => {
        const current = get().failureCount;
        const newCount = current + 1;
        if (newCount >= 3) {
          set({ failureCount: newCount, status: 'LOOP_DETECTED' });
        } else {
          set({ failureCount: newCount });
        }
      },
      resetAuthSession: () => {
        console.warn('HARD RESET TRIGGERED: Clearing session storage and state');
        localStorage.clear();
        set({ user: null, token: null, status: 'IDLE', failureCount: 0 });
      }
    }),
    {
      name: 'pos-auth-storage',
    }
  )
);