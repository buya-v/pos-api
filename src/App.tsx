import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { FiscalStatusHeader } from './components/FiscalStatusHeader';
import { ManualEntryForm } from './components/ManualEntryForm';
import { LogStreamer } from './components/LogStreamer';
import { GlobalToast } from './components/GlobalToast';
import { mockApi } from './services/api';
import { format } from 'date-fns';

function App() {
  const { 
    fiscalStatus, 
    setFiscalStatus, 
    logs, 
    addLog,
    globalError, 
    setGlobalError 
  } = useStore();

  // Health Check Polling (AC 4.5 Loop Prevention logic handled by interval)
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const isAlive = await mockApi.checkHealth();
        setFiscalStatus(isAlive ? 'connected' : 'disconnected');
        
        if (!isAlive) {
          // Only log health failures sparingly to avoid noise, but for this demo we log
          // in a real app, we wouldn't log every health ping failure
        }
      } catch (e) {
        setFiscalStatus('disconnected');
      }
    };

    const interval = setInterval(checkHealth, 5000);
    checkHealth(); // Initial check

    return () => clearInterval(interval);
  }, [setFiscalStatus]);

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      <FiscalStatusHeader status={fiscalStatus} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-md grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Actions */}
        <div className="lg:col-span-1 space-y-6">
          <ManualEntryForm />
          
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <h3 className="font-bold mb-2">Daily Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Transactions</p>
                <p className="text-xl font-bold">{logs.filter(l => l.status === 200).length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Errors</p>
                <p className="text-xl font-bold text-status-error">{logs.filter(l => l.status >= 500).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Logs */}
        <div className="lg:col-span-2">
          <LogStreamer logs={logs} />
        </div>
      </main>

      <GlobalToast 
        error={globalError} 
        onClose={() => setGlobalError(null)} 
      />
    </div>
  );
}

export default App;