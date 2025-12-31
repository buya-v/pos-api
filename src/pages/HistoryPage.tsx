import { useState } from 'react';
import { useFiscalStore } from '@/store/fiscalStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { Search, Ban } from 'lucide-react';

const HistoryPage = () => {
  const { transactions, voidTransaction } = useFiscalStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => 
    t.external_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.fiscal_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sales History</h2>
          <p className="text-slate-500">Audit log of all registered transactions.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search POS Ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm w-64"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Reference</th>
              <th className="px-6 py-3">Fiscal ID</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-600">
                  {format(new Date(tx.created_at), 'MMM dd, HH:mm')}
                </td>
                <td className="px-6 py-4 font-mono font-medium text-slate-900">{tx.external_ref}</td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                  {tx.fiscal_code || '-'}
                </td>
                <td className="px-6 py-4 text-right font-medium">
                  {formatCurrency(tx.total_amount)}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  {tx.status !== 'VOID' && tx.status !== 'ERROR' && (
                    <button
                      onClick={() => voidTransaction(tx.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Void Transaction"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No transactions found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;