import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { StatusBadge } from '../common/StatusBadge';
import { RefreshCw, Search } from 'lucide-react';

export const TransactionTable: React.FC = () => {
  const { transactions } = useStore();
  const [searchTraceId, setSearchTraceId] = useState('');

  const filtered = transactions.filter(t => 
    searchTraceId === '' || 
    (t.traceId && t.traceId.includes(searchTraceId))
  );

  return (
    <div className="bg-surface-card shadow-sm rounded-lg overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Fiscal Journal</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search Trace ID..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchTraceId}
            onChange={(e) => setSearchTraceId(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref / Trace ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                        No transactions found.
                    </td>
                </tr>
            ) : (
                filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{tx.id}</div>
                    {tx.traceId && <div className="text-xs text-gray-400 font-mono">Trace: {tx.traceId}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.currency} {tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {tx.status === 'danger' && (
                        <button className="text-primary hover:text-indigo-900 flex items-center justify-end gap-1 ml-auto">
                        <RefreshCw className="h-3 w-3" /> Retry
                        </button>
                    )}
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};