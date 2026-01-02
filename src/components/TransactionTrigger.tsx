import React from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTransactionStore } from '../store/transactionStore';

export const TransactionTrigger: React.FC = () => {
  const { token } = useAuthStore();
  const { initTransaction, isLoading } = useTransactionStore();

  const handleClick = () => {
    // Security check before payload init
    if (!token) {
      console.error('Cannot init transaction: Missing Auth Token');
      return;
    }
    console.log('Triggering New Transaction');
    initTransaction();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || !token}
      className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-active transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="New Transaction"
    >
      {isLoading ? (
        <span className="animate-pulse">Initializing...</span>
      ) : (
        <>
          <Plus size={20} />
          <span className="font-medium">New Transaction</span>
        </>
      )}
    </button>
  );
};