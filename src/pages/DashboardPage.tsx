import React, { useState } from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Receipt, ApiError } from '../types';
import { RefreshCw, Printer, AlertOctagon } from 'lucide-react';
import { simulateApiCall } from '../utils/mockApi';
import { useToastStore } from '../store/toastStore';

// Mock Data
const MOCK_RECEIPTS: Receipt[] = [
  { id: 'rcpt_882', merchantId: 'm_1', amount: 120.50, currency: 'EUR', timestamp: '2023-10-27T10:23:00Z', items: [], status: 'synced', fiscalSignature: 'SIG_123', qrCodeUrl: '#' },
  { id: 'rcpt_883', merchantId: 'm_1', amount: 45.00, currency: 'EUR', timestamp: '2023-10-27T10:45:00Z', items: [], status: 'synced', fiscalSignature: 'SIG_124', qrCodeUrl: '#' },
  { id: 'rcpt_884', merchantId: 'm_1', amount: 890.99, currency: 'EUR', timestamp: '2023-10-27T11:12:00Z', items: [], status: 'pending', fiscalSignature: '', qrCodeUrl: '#' },
];

export const DashboardPage: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>(MOCK_RECEIPTS);
  const [loading, setLoading] = useState(false);
  const { showError } = useToastStore();

  // Handler to simulate a sync error
  const handleSimulateError = async () => {
    setLoading(true);
    try {
      await simulateApiCall(false, null, 'network');
    } catch (err) {
      showError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fiscal Overview</h1>
          <p className="text-slate-500">Merchant ID: <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">8827-ACME-CORP</span></p>
        </div>
        <div className="flex gap-3">
          <StatusBadge status="active" />
          <Button variant="outline" onClick={handleSimulateError} isLoading={loading} className="border-red-200 hover:bg-red-50 text-red-600">
            <AlertOctagon className="w-4 h-4 mr-2" /> Simulate Crash
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Daily Total</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">€1,056.49</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Transactions</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Last Sync</p>
          <p className="text-lg font-bold text-slate-900 mt-2">2 mins ago</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900">Transaction Log</h3>
          <Button variant="ghost" size="sm"><RefreshCw className="w-4 h-4" /></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Receipt ID</th>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receipts.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-slate-600">{r.id}</td>
                  <td className="px-6 py-4">{new Date(r.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium">€{r.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.status === 'synced' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {r.status === 'synced' ? 'Fiscal Valid' : 'Queueing'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-accent hover:text-blue-700">
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};