import { TransactionStatus } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: TransactionStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    SYNCED: { color: 'bg-green-100 text-green-700', icon: CheckCircle2, label: 'Synced' },
    PENDING: { color: 'bg-orange-100 text-orange-700', icon: Clock, label: 'Pending' },
    ERROR: { color: 'bg-red-100 text-red-700', icon: AlertTriangle, label: 'Error' },
    VOID: { color: 'bg-slate-200 text-slate-600', icon: XCircle, label: 'Voided' },
  };

  const { color, icon: Icon, label } = config[status];

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", color)}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </span>
  );
};