import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ManualEntryForm } from '../components/dashboard/ManualEntryForm';
import { TransactionTable } from '../components/dashboard/TransactionTable';
import { useStore } from '../store/useStore';

export const Dashboard: React.FC = () => {
  const { currentMerchant } = useStore();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
        <p className="text-gray-500">Welcome back, {currentMerchant?.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input and Stats */}
        <div className="lg:col-span-1 space-y-6">
          <ManualEntryForm />
          
          <div className="bg-indigo-900 text-white p-6 rounded-lg shadow-sm">
             <h3 className="text-lg font-semibold mb-2">API Status</h3>
             <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-success animate-pulse"></span>
                <span className="text-sm font-medium">Systems Online</span>
             </div>
             <p className="text-xs text-indigo-200 opacity-80">
                Gateway latency: 45ms<br/>
                Fiscal Queue: 0 pending
             </p>
          </div>
        </div>

        {/* Right Column: Data Table */}
        <div className="lg:col-span-2">
          <TransactionTable />
        </div>
      </div>
    </Layout>
  );
};