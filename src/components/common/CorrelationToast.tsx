import React from 'react';
import { useToastStore } from '../../store/toastStore';
import { X, Copy } from 'lucide-react';

export const CorrelationToast: React.FC = () => {
  const { error, clearError } = useToastStore();

  if (!error) return null;

  const copyId = () => {
    navigator.clipboard.writeText(error.correlationId);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white rounded-lg shadow-lg border border-red-100 overflow-hidden">
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0 w-1 bg-error rounded-full self-stretch" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
              {error.errorCode}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{error.message}</p>
            <div className="mt-2 flex items-center gap-2">
              <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">
                ID: {error.correlationId}
              </code>
              <button 
                onClick={copyId}
                className="text-xs text-accent hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy ID
              </button>
            </div>
          </div>
          <button onClick={clearError} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};