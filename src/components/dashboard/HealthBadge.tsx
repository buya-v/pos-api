import { Activity, Database, Cloud, Lock } from 'lucide-react';
import { HealthCheck, ServiceStatus } from '../../types';
import { clsx } from 'clsx';

interface Props {
  health: HealthCheck;
}

const getIcon = (service: string) => {
  switch (service) {
    case 'DB_CONNECTION': return <Database className="w-4 h-4" />;
    case 'TAX_AUTHORITY': return <Cloud className="w-4 h-4" />;
    case 'VAULT': return <Lock className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

const getStatusColor = (status: ServiceStatus) => {
  switch (status) {
    case 'operational': return 'bg-status-success';
    case 'degraded': return 'bg-status-warning';
    case 'down': return 'bg-status-error';
  }
};

export const HealthBadge = ({ health }: Props) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-card border border-gray-100 min-w-[200px]">
      <div className="flex items-center gap-3">
        <div className={clsx("p-2 rounded-lg bg-gray-50 text-gray-600")}>
          {getIcon(health.service)}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {health.service.replace('_', ' ')}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {health.status === 'operational' ? 'Healthy' : health.status}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className={clsx("w-2.5 h-2.5 rounded-full animate-pulse", getStatusColor(health.status))} />
        <span className="text-xs font-mono text-gray-400">{health.latencyMs}ms</span>
      </div>
    </div>
  );
};