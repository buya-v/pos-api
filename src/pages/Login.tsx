import React from 'react';
import { useStore } from '../store/useStore';
import { ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useStore();

  const handleLogin = () => {
    // Simulation of authentication flow
    login({
      id: 'mer_12345',
      name: 'Retail Solutions Ltd',
      email: 'admin@retailsolutions.com',
      apiKey: 'sk_live_51Mz...'
    });
  };

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">POS-API Portal</h2>
        <p className="text-gray-500 mb-8">Fiscal Management Solution</p>
        
        <button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded transition"
        >
          Sign In as Merchant Admin
        </button>
        <p className="mt-4 text-xs text-gray-400">
          (Demo Mode: Click to auto-login)
        </p>
      </div>
    </div>
  );
};