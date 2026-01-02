import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useTransactionStore } from '../store/transactionStore';
import { TransactionTrigger } from '../components/TransactionTrigger';
import { TransactionModal } from '../components/TransactionModal';
import { FiscalActionGroup } from '../components/FiscalActionGroup';
import { LogOut, FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { transactions, voidTransaction } = useTransactionStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="bg-primary p-2 rounded text-white">
               <FileText size={24} />
             </div>
             <h1 className="text-xl font-bold text-gray-900">POS-API <span className="text-xs font-normal text-gray-500">v1.8.0</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Operator: <strong>{user?.username}</strong></span>
            <button 
              onClick={logout}
              className="text-gray-500 hover:text-error transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
             <h2 className="text-2xl font-bold text-gray-800">Sales Terminal</h2>
             <p className="text-gray-500">Fiscal Management Dashboard</p>
          </div>
          <TransactionTrigger />
        </div>

        {/* Transaction History Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Fiscal Code</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                       No transactions recorded today.
                     </td>
                   </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">{tx.id}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${tx.status === 'REGISTERED' ? 'bg-green-100 text-green-800' : 
                            tx.status === 'VOIDED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">${tx.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{tx.fiscalCode || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                           <FiscalActionGroup 
                              onSync={() => console.log('Syncing', tx.id)}
                              onRegister={() => console.log('Reprint', tx.id)}
                              onCancel={() => voidTransaction(tx.id)}
                              isProcessing={false}
                           />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <TransactionModal />
    </div>
  );
};