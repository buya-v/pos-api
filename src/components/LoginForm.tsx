import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui/Button';
import { DebugModal } from './DebugModal';
import { Lock, User as UserIcon, AlertCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('merchant@pos-api.com');
  const [password, setPassword] = useState('password123');
  const { login, isLoading, error, failedAttempts, resetError } = useAuthStore();
  const [showDebug, setShowDebug] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (failedAttempts >= 2) {
        // Auto-show debug info if we are struggling
        setShowDebug(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary p-6 text-center">
          <h2 className="text-2xl font-bold text-white">POS-API Portal</h2>
          <p className="text-blue-100 mt-2">Fiscal Management Solution</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm flex items-start gap-2">
                 <AlertCircle className="w-5 h-5 flex-shrink-0" />
                 <div>
                   <p className="font-bold">{error.code}</p>
                   <p>{error.message}</p>
                   {failedAttempts > 0 && (
                     <button 
                       type="button" 
                       onClick={() => setShowDebug(true)} 
                       className="text-xs underline mt-1 text-red-800 hover:text-red-900"
                     >
                       View Debug Details
                     </button>
                   )}
                 </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
              disabled={failedAttempts >= 3}
            >
              {failedAttempts >= 3 ? 'Account Locked' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
             System Status: <span className="text-success font-medium">Online</span> | v1.7.0
             <br/>
             Try <b>fail@test.com</b> to see error handling.
          </div>
        </div>
      </div>

      <DebugModal 
        isOpen={showDebug} 
        onClose={() => setShowDebug(false)} 
        error={error} 
      />
    </div>
  );
};