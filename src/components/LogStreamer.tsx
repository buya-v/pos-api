import React, { useState } from 'react';
import { Search, Activity } from 'lucide-react';
import { LogEntry } from '../types';
import { clsx } from 'clsx';

interface LogStreamerProps {
  logs: LogEntry[];
}

export const LogStreamer: React.FC<LogStreamerProps> = ({ logs }) => {
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => 
    search === '' || 
    log.correlationId?.toLowerCase().includes(search.toLowerCase()) ||
    log.url.toLowerCase().includes(search.toLowerCase()) ||
    log.status.toString().includes(search)
  );

  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-200 flex flex-col h-[500px]">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-gray-500" />
          <h2 className="font-bold text-gray-800">System Logs (Last 50)</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Search Correlation ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-1 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-brand-primary w-64"
          />
        </div>
      </div>

      <div className="overflow-auto flex-1 bg-gray-50">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Latency</th>
              <th className="px-4 py-3">Correlation ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                <td className="px-4 py-2 font-mono font-bold">{log.method}</td>
                <td className="px-4 py-2 text-gray-700">{log.url}</td>
                <td className="px-4 py-2">
                  <span className={clsx(
                    "px-2 py-0.5 rounded text-xs font-bold",
                    log.status >= 500 ? "bg-red-100 text-status-error" :
                    log.status >= 400 ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-status-success"
                  )}>
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">{log.durationMs}ms</td>
                <td className="px-4 py-2 font-mono text-xs text-gray-600">
                  {log.correlationId || '-'}
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No logs found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
