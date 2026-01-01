import React from 'react';
import { CheckCircle, WifiOff, RefreshCw } from 'lucide-react';
import { FiscalStatus } from '../types';
import { clsx } from 'clsx';

interface Props {
  status: FiscalStatus | null;
  isLoading: boolean;
}

export const FiscalStatusCard: React.FC<Props> = ({ status, isLoading }) => {
  if (isLoading || !status) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Fiscal Authority Connection</h3>
          <div className="mt-2 flex items-center gap-2">
            {status.status === 'healthy' ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <WifiOff className="w-6 h-6 text-error" />
            )}
            <span className={clsx("text-2xl font-bold", {
              'text-success': status.status === 'healthy',
              'text-error': status.status !== 'healthy'
            })}>
              {status.status === 'healthy' ? 'Live & Synced' : 'Connection Lost'}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-slate-400">
           <div className="flex items-center gap-1 justify-end">
             <RefreshCw className="w-3 h-3" />
             Last Sync: {new Date(status.lastSync).toLocaleTimeString()}
           </div>
           <div className="mt-1">ID: {status.fiscalId}</div>
        </div>
      </div>
    </div>
  );
};