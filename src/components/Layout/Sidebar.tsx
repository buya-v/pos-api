import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, History, Settings, Wifi, WifiOff } from 'lucide-react';
import { useFiscalStore } from '@/store/fiscalStore';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { isOnline, toggleOnlineStatus } = useFiscalStore();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/entry', icon: Receipt, label: 'Manual Entry' },
    { to: '/history', icon: History, label: 'Sales History' },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">POS-API</h1>
        <p className="text-xs text-slate-400 mt-1">Fiscal Management v1.0</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 rounded-lg text-sm transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={toggleOnlineStatus}
          className={cn(
            "flex items-center justify-center w-full px-4 py-2 rounded-md text-sm font-medium transition-colors",
            isOnline ? "bg-green-600/20 text-green-400" : "bg-orange-600/20 text-orange-400"
          )}
        >
          {isOnline ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
          {isOnline ? "System Online" : "Offline Mode"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;