import { Server, ShieldCheck } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-brand-primary/10 p-2 rounded-lg">
          <Server className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">POS-API <span className="text-gray-400 font-normal">| Fiscal Gateway</span></h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
          <ShieldCheck className="w-4 h-4 text-status-success" />
          <span>Tenant: Retail-01</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-bold">
          AD
        </div>
      </div>
    </header>
  );
};