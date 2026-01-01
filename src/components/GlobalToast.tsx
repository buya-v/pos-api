import React, { useEffect } from 'react';
import { XCircle, Copy, X } from 'lucide-react';
import { Rfc7807Error } from '../types';

interface GlobalToastProps {
  error: Rfc7807Error | null;
  onClose: () => void;
}

export const GlobalToast: React.FC<GlobalToastProps> = ({ error, onClose }) => {
  // Auto-dismiss logic loop prevention (AC 4.4)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(onClose, 8000);
      return () => clearTimeout(timer);
    }
  }, [error, onClose]);

  if (!error) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white border-l-4 border-status-error shadow-xl rounded-sm p-4 w-96 flex flex-col gap-2 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3">
          <XCircle className="text-status-error shrink-0" size={24} />
          <div className="w-full">
            <h3 className="font-bold text-gray-900">{error.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{error.detail}</p>
            
            <div className="mt-3 bg-gray-50 p-2 rounded border border-gray-200 flex items-center justify-between">
              <code className="text-xs text-gray-500 break-all">
                CID: {error.correlationId}
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(error.correlationId)}
                className="text-brand-primary hover:bg-blue-50 p-1 rounded"
                title="Copy Correlation ID"
              >
                <Copy size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};