import { useFiscalStore } from '@/store/fiscalStore';
import { StatCard } from '@/components/Dashboard/StatCard';
import { DollarSign, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/StatusBadge';

const DashboardPage = () => {
  const { getStats, transactions, retryPending } = useFiscalStore();
  const stats = getStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue"
          value={formatCurrency(stats.totalSales)}
          icon={DollarSign}
          color="blue"
        />
        <StatCard 
          title="VAT Collected"
          value={formatCurrency(stats.totalVAT)}
          icon={FileText}
          color="green"
        />
        <StatCard 
          title="Pending Sync"
          value={stats.pendingCount.toString()}
          icon={AlertCircle}
          color={stats.pendingCount > 0 ? "orange" : "green"}
        />
        <StatCard 
          title="Transactions"
          value={stats.transactionCount.toString()}
          icon={FileText}
          color="blue"
        />
      </div>

      {stats.pendingCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-orange-600 w-5 h-5" />
            <div>
              <h3 className="font-semibold text-orange-900">Offline Transactions Detected</h3>
              <p className="text-sm text-orange-700">You have {stats.pendingCount} transactions waiting to be sent to the Tax Authority.</p>
            </div>
          </div>
          <button 
            onClick={() => retryPending()}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Tax</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-slate-600">{tx.external_ref}</td>
                  <td className="px-6 py-3 font-medium">{formatCurrency(tx.total_amount)}</td>
                  <td className="px-6 py-3 text-slate-500">{formatCurrency(tx.tax_amount)}</td>
                  <td className="px-6 py-3"><StatusBadge status={tx.status} /></td>
                  <td className="px-6 py-3 text-slate-400">{new Date(tx.created_at).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;