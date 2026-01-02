import React from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface FiscalActionGroupProps {
  onSync: () => void;
  onRegister: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export const FiscalActionGroup: React.FC<FiscalActionGroupProps> = ({
  onSync,
  onRegister,
  onCancel,
  isProcessing
}) => {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <button
        onClick={onRegister}
        disabled={isProcessing}
        className="flex-1 flex items-center justify-center gap-2 bg-success text-white px-4 py-2 rounded-sm hover:bg-green-700 disabled:opacity-50"
      >
        <CheckCircle size={18} />
        Register
      </button>
      
      <button
        onClick={onSync}
        disabled={isProcessing}
        className="flex-1 flex items-center justify-center gap-2 bg-warning text-white px-4 py-2 rounded-sm hover:bg-orange-600 disabled:opacity-50"
      >
        <RefreshCw size={18} className={isProcessing ? 'animate-spin' : ''} />
        Sync
      </button>

      <button
        onClick={onCancel}
        disabled={isProcessing}
        className="flex-1 flex items-center justify-center gap-2 bg-error text-white px-4 py-2 rounded-sm hover:bg-red-700 disabled:opacity-50"
      >
        <XCircle size={18} />
        Cancel
      </button>
    </div>
  );
};