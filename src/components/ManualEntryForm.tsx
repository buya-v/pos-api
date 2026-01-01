import React, { useState } from 'react';
import { Receipt, Printer, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockApi } from '../services/api';
import { Rfc7807Error } from '../types';
import { format } from 'date-fns';

export const ManualEntryForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { addLog, setGlobalError } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const numAmount = parseFloat(amount);
    setLoading(true);
    const startTime = performance.now();

    try {
      const result = await mockApi.signTransaction(numAmount);
      
      // Log Success
      addLog({
        timestamp: format(new Date(), 'HH:mm:ss.SSS'),
        method: 'POST',
        url: '/v1/fiscal/sign',
        status: 200,
        durationMs: Math.round(performance.now() - startTime)
      });

      // Reset form on success
      setAmount('');
      // In a real app, we would show a print preview here
      console.log("Receipt Generated:", result);

    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      const error = err as Rfc7807Error;

      // Log Failure (AC 4.2: Correlation ID matching)
      addLog({
        timestamp: format(new Date(), 'HH:mm:ss.SSS'),
        method: 'POST',
        url: '/v1/fiscal/sign',
        status: error.status,
        correlationId: error.correlationId,
        durationMs: duration,
        detail: error.detail
      });

      // Global Exception Middleware Logic (GEM)
      setGlobalError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="text-brand-primary" />
        <h2 className="text-lg font-bold font-main">Manual Transaction Entry</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Amount (EUR)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
            placeholder="0.00"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !amount}
          className="w-full bg-brand-primary text-white font-medium py-2 px-4 rounded-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">Signing...</span>
          ) : (
            <>
              <Printer size={18} />
              <span>Generate & Print Fiscal Receipt</span>
            </>
          )}
        </button>

        <div className="bg-blue-50 p-3 rounded-sm border border-blue-100 flex gap-2">
          <AlertTriangle className="text-brand-primary w-5 h-5 shrink-0" />
          <p className="text-xs text-blue-800">
            This action will immediately register the transaction with the central tax authority. Use "Void" for corrections.
          </p>
        </div>
      </form>
    </div>
  );
};
