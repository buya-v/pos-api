import React from 'react';
import { Server, Wifi, WifiOff } from 'lucide-react';

interface FiscalStatusHeaderProps {
  status: 'connected' | 'disconnected' | 'warning';
}

export const FiscalStatusHeader: React.FC<FiscalStatusHeaderProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return { color: 'bg-status-success', text: 'Online & Signed', icon: Wifi };
      case 'disconnected':
        return { color: 'bg-status-error', text: 'Fiscal Device Disconnected', icon: WifiOff };
      case 'warning':
      default:
        return { color: 'bg-yellow-500', text: 'Connecting...', icon: Server };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="w-full p-md bg-white shadow-sm border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary/10 rounded-sm">
          <Server className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-main">POS-API Dashboard</h1>
          <p className="text-xs text-gray-500">v1.3.0 | Fiscal-Middleware-as-a-Service</p>
        </div>
      </div>
      
      <div className={`flex items-center gap-2 px-4 py-2 rounded-sm text-white ${config.color}`}>
        <Icon size={18} />
        <span className="font-medium text-sm">{config.text}</span>
      </div>
    </div>
  );
};
