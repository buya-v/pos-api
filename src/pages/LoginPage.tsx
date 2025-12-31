import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Fake login
    setTimeout(() => {
      login('fake_jwt_token', { id: '1', name: 'Admin', email, role: 'merchant' });
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
          POS-API Gateway
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to your merchant dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            <Input 
              label="Email address"
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <Input 
              label="Password" 
              type="password" 
              required 
              defaultValue="password"
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </form>
          
          <div className="mt-6">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Test Account</span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-slate-500">
                Use any email to login
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};