import React from 'react';
import { AlertTriangle, Copy, X } from 'lucide-react';
import { ApiError } from '../types';
import { Button } from './ui/Button';

interface DebugModalProps {
  error: ApiError | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DebugModal: React.FC<DebugModalProps> = ({ error, isOpen, onClose }) => {
  if (!isOpen || !error) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(error, null, 2));
    alert('Debug info copied to clipboard');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-slate-800">System Diagnostic Info</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 bg-slate-50">
          <p className="text-sm text-slate-600 mb-2">
            The system encountered a critical error. Please share the following JSON blob with technical support.
          </p>
          <pre className="bg-slate-900 text-green-400 p-4 rounded text-xs overflow-x-auto font-mono mb-4">
            {JSON.stringify(error, null, 2)}
          </pre>
          
          <div className="flex justify-end gap-2">
             <Button variant="secondary" onClick={onClose}>Close</Button>
             <Button onClick={handleCopy} className="flex items-center gap-2">
               <Copy className="w-4 h-4" />
               Copy Debug Info
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};