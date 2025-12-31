import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'active' | 'warning' | 'error';
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const config = {
    active: { color: 'text-success bg-green-50 border-green-200', icon: CheckCircle2, text: 'Active' },
    warning: { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: AlertTriangle, text: 'Maintenance' },
    error: { color: 'text-error bg-red-50 border-red-200', icon: XCircle, text: 'Offline' },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${current.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {label || current.text}
    </div>
  );
};