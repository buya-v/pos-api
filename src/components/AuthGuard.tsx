import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { status, failureCount, resetAuthSession } = useAuthStore();

  useEffect(() => {
    // REQ-8.3: Circuit Breaker Reset
    if (status === 'LOOP_DETECTED' || failureCount >= 3) {
      console.error('Auth Loop Detected. Initiating Hard Reset.');
      resetAuthSession();
      window.location.reload(); // Force browser refresh to clear memory
    }
  }, [status, failureCount, resetAuthSession]);

  if (status === 'IDLE' || status === 'ERROR') {
    return null; // Will be handled by App.tsx router logic to show Login
  }

  return <>{children}</>;
};