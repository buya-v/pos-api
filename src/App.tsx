import React from 'react';
import { useAuthStore } from './store/authStore';
import { AuthGuard } from './components/AuthGuard';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

function App() {
  const { status } = useAuthStore();

  return (
    <AuthGuard>
      {status === 'AUTHENTICATED' ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </AuthGuard>
  );
}

export default App;