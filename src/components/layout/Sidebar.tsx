import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, Receipt, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Sidebar: React.FC = () => {
  const logout = useAuthStore(state => state.logout);
  
  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`;

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight">POS-API <span className="text-accent">Admin</span></h1>
        <p className="text-xs text-slate-400 mt-1">Fiscal Middleware v1.1</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <NavLink to="/dashboard" className={navItemClass}>
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </NavLink>
        <NavLink to="/onboarding" className={navItemClass}>
          <Store className="w-4 h-4" /> Onboarding
        </NavLink>
        <NavLink to="/receipts" className={navItemClass}>
          <Receipt className="w-4 h-4" /> Receipts
        </NavLink>
        <NavLink to="/settings" className={navItemClass}>
          <Settings className="w-4 h-4" /> Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white w-full"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
};