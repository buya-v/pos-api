import React, { useState } from 'react';
import { useTransactionStore } from '../store/transactionStore';
import { TransactionPayload } from '../types';
import { X } from 'lucide-react';

export const TransactionModal: React.FC = () => {
  const { isModalOpen, closeTransaction, submitTransaction, isLoading } = useTransactionStore();
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // REQ-8.2: Payload Integrity / Schema Validation
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Invalid amount. Must be positive.');
      return;
    }

    const payload: TransactionPayload = {
      items: [{ id: '1', name: 'Manual Entry', price: parsedAmount, quantity: 1 }],
      totalAmount: parsedAmount,
      timestamp: new Date().toISOString()
    };

    submitTransaction(payload).then(() => {
      setAmount('');
      setError(null);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">New Fiscal Receipt</h3>
          <button onClick={closeTransaction} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-sm p-2 focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="0.00"
              autoFocus
            />
            {error && <p className="text-error text-sm mt-1">{error}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeTransaction}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Issue Receipt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};