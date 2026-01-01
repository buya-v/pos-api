import React from 'react';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <ErrorBoundary>
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </ErrorBoundary>
  );
};

export default App;