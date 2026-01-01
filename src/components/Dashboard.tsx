import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { mockApi } from '../services/api';
import { FiscalStatus, Transaction } from '../types';
import { FiscalStatusCard } from './FiscalStatusCard';
import { Button } from './ui/Button';
import { LogOut, Printer, FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [status, setStatus] = useState<FiscalStatus | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // P1: Cache-First strategy simulated by parallel fetch
        const [statusData, txData] = await Promise.all([
          mockApi.getFiscalStatus(),
          mockApi.getTransactions()
        ]);
        setStatus(statusData);
        setTransactions(txData);
      } catch (e) {
        console.error('Failed to fetch dashboard data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="bg-primary h-8 w-8 rounded flex items-center justify-center text-white font-bold">P</div>
           <h1 className="font-bold text-slate-800">POS-API Portal <span className="text-xs font-normal text-slate-500 ml-2">v1.7.0</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Merchant: <b>{user?.name}</b></span>
          <Button variant="secondary" onClick={logout} className="flex items-center gap-2 text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* P2.2 Fiscal Status Indicator */}
        <FiscalStatusCard status={status} isLoading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
              <Button className="text-sm">New Transaction</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono">{tx.id}</td>
                      <td className="px-4 py-3">{new Date(tx.timestamp).toLocaleTimeString()}</td>
                      <td className="px-4 py-3 font-bold">${tx.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tx.status === 'synced' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                         <button className="text-primary hover:text-blue-700"><Printer className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactions.length === 0 && !loading && (
                <div className="p-4 text-center text-slate-500">No transactions found.</div>
              )}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
               <div className="space-y-3">
                 <Button variant="secondary" className="w-full justify-start gap-2">
                   <FileText className="w-4 h-4" /> Generate Z-Report
                 </Button>
                 <Button variant="secondary" className="w-full justify-start gap-2">
                   <FileText className="w-4 h-4" /> Export VAT Log
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};