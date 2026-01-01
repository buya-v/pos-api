import { useEffect, useState } from 'react';
import { useFiscalStore } from '../store/fiscalStore';
import { HealthBadge } from '../components/dashboard/HealthBadge';
import { ThroughputChart } from '../components/dashboard/ThroughputChart';
import { LogSearch } from '../components/diagnostics/LogSearch';
import { RefreshCw, Plus, AlertCircle } from 'lucide-react';
import { ProblemDetails } from '../types';

export const Dashboard = () => {
  const { health, refreshHealth, addTransaction, simulateError, toggleSimulation, logs } = useFiscalStore();
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<ProblemDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const interval = setInterval(refreshHealth, 5000);
    return () => clearInterval(interval);
  }, [refreshHealth]);

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    try {
      await addTransaction(Number(amount));
      setAmount('');
    } catch (err: any) {
      setError(err as ProblemDetails);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Health Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">System Health & Status</h2>
          <div className="flex gap-3">
             <button 
              onClick={toggleSimulation}
              className={`text-xs font-medium px-3 py-1 rounded border ${simulateError ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-600 border-gray-200'}`}
            >
              {simulateError ? 'Simulation: FAILURE' : 'Simulation: NORMAL'}
            </button>
            <button onClick={refreshHealth} className="text-gray-500 hover:text-brand-primary transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {health.map((h) => (
            <HealthBadge key={h.service} health={h} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <ThroughputChart />
          
          <div className="bg-white p-6 rounded-md shadow-card border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Manual Transaction Entry</h3>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-status-error rounded-r-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-status-error mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-gray-900">{error.title}</p>
                    <p className="text-gray-700 mt-1">{error.detail}</p>
                    <div className="mt-2 pt-2 border-t border-red-200 text-xs font-mono text-gray-600">
                      Correlation ID: <span className="select-all">{error.correlationId}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleTransaction} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (EUR)</label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">Use negative value to test validation error.</p>
              </div>
              <button 
                disabled={!amount || isProcessing}
                className="bg-brand-primary text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Generate Receipt
              </button>
            </form>
          </div>
        </div>

        {/* Diagnostics Side Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-md shadow-card border border-gray-100 h-full">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Log Diagnostics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Paste a Correlation ID to view the sanitized stack trace and error details.
            </p>
            <LogSearch />
            
            <div className="mt-8 border-t border-gray-100 pt-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Recent Logs</h4>
              <ul className="space-y-2">
                {logs.slice(0, 5).map((log, i) => (
                  <li key={i} className="text-xs font-mono text-gray-500 truncate border-b border-gray-50 pb-1 last:border-0">
                    <span className={log.status >= 500 ? 'text-red-500' : 'text-amber-500'}>{log.status}</span> | {log.correlationId}
                  </li>
                ))}
                {logs.length === 0 && <li className="text-xs text-gray-400 italic">No recent errors logged.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};