import { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { useFiscalStore } from '../../store/fiscalStore';
import { ProblemDetails } from '../../types';

export const LogSearch = () => {
  const [searchId, setSearchId] = useState('');
  const [foundLog, setFoundLog] = useState<ProblemDetails | null>(null);
  const { logs } = useFiscalStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const log = logs.find(l => l.correlationId.includes(searchId));
    setFoundLog(log || null);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter X-Correlation-ID (e.g. req-9900...)"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm font-mono"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Trace
        </button>
      </form>

      {foundLog && (
        <div className="bg-gray-900 rounded-md p-4 shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 mb-3 text-status-error">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-bold text-sm">Exception Caught</span>
          </div>
          <pre className="text-xs text-gray-300 font-mono overflow-x-auto p-2 bg-black/30 rounded">
            {JSON.stringify(foundLog, null, 2)}
          </pre>
        </div>
      )}
      
      {!foundLog && searchId && logs.length > 0 && (
         <p className="text-xs text-gray-500 mt-2">Try searching for: <span className="font-mono">{logs[0].correlationId}</span></p>
      )}
    </div>
  );
};