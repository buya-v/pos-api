import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { fiscalizeTransaction } from '../../utils/api';
import { ApiError } from '../../types';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export const ManualEntryForm: React.FC = () => {
  const { currentMerchant, addTransaction } = useStore();
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMerchant) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const val = parseFloat(amount);
      if (isNaN(val) || val <= 0) throw new Error('Invalid amount');

      const tx = await fiscalizeTransaction(val, currentMerchant.id);
      addTransaction(tx);
      setSuccess(true);
      setAmount('');
    } catch (err: any) {
      // P0 Requirement: Display specific error code and Trace ID
      const formattedError: ApiError = err.traceId ? err : {
        error: err.message || 'Unknown Error',
        code: 'GEN-500',
        traceId: 'N/A',
        context: 'Frontend validation or unknown catch'
      };
      setError(formattedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-card p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Fiscal Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Transaction Amount (USD)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              step="0.01"
              className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Error Display Component conforming to P0 reqs */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-danger" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error: {error.code}</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error.error}</p>
                  <p className="mt-1 font-mono text-xs">Trace ID: {error.traceId}</p>
                  <p className="text-xs text-gray-500 mt-1">Context: {error.context}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4 border border-green-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Receipt Generated Successfully</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Generate Fiscal Receipt'}
        </button>
      </form>
    </div>
  );
};