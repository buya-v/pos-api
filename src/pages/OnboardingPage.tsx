import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { validateVat } from '../utils/mockApi';
import { useToastStore } from '../store/toastStore';
import { CheckCircle2, Building2, Key } from 'lucide-react';
import { ApiError } from '../types';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ legalName: '', tradeName: '', address: '', vatNumber: '' });
  const [credentials, setCredentials] = useState<{ id: string, secret: string } | null>(null);
  const { showError } = useToastStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1 = () => {
    if (!formData.legalName || !formData.address) return;
    setStep(2);
  };

  const handleStep2 = async () => {
    setLoading(true);
    try {
      // Simulate Fiscal Validation
      await validateVat(formData.vatNumber);
      
      // If successful, generate mock credentials
      setCredentials({
        id: `client_${Math.random().toString(36).substr(2, 8)}`,
        secret: `sk_live_${Math.random().toString(36).substr(2, 24)}`
      });
      setStep(3);
    } catch (err) {
      showError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Merchant Onboarding</h1>
        <p className="text-slate-500">Register a new legal entity for fiscal signing.</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${step >= s ? 'border-primary bg-primary text-white' : 'border-slate-200 text-slate-400'}`}>
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? 'bg-primary' : 'bg-slate-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Building2 className="w-5 h-5" />
              <h2 className="font-semibold">Legal Entity Details</h2>
            </div>
            <Input label="Legal Name" name="legalName" value={formData.legalName} onChange={handleChange} placeholder="e.g. Acme Corp Ltd." />
            <Input label="Trade Name" name="tradeName" value={formData.tradeName} onChange={handleChange} placeholder="e.g. Acme Store" />
            <Input label="Registered Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Fiscal Street..." />
            <div className="flex justify-end mt-6">
              <Button onClick={handleStep1} disabled={!formData.legalName}>Next: Fiscal Validation</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="font-semibold">Fiscal Validation</h2>
            </div>
            <p className="text-sm text-slate-500">Enter the VAT number. This will be validated against the VIES database in real-time.</p>
            <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700 mb-2">
              Hint: Use a VAT starting with "DE" to succeed. Any other will fail validation.
            </div>
            <Input label="VAT / Tax ID" name="vatNumber" value={formData.vatNumber} onChange={handleChange} placeholder="DE123456789" />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleStep2} isLoading={loading} disabled={!formData.vatNumber}>Validate & Generate Keys</Button>
            </div>
          </div>
        )}

        {step === 3 && credentials && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Key className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Onboarding Complete!</h2>
              <p className="text-slate-500">Your fiscal signing credentials have been generated.</p>
            </div>

            <div className="bg-slate-900 rounded-md p-4 space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase">Client ID</label>
                <div className="flex items-center justify-between text-white font-mono text-sm">
                  {credentials.id}
                </div>
              </div>
              <div className="h-px bg-slate-700" />
              <div>
                <label className="text-xs text-slate-400 uppercase">Client Secret</label>
                <div className="flex items-center justify-between text-white font-mono text-sm">
                  {credentials.secret}
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm">
              Warning: Store these credentials securely. The Client Secret will not be shown again.
            </div>

            <div className="flex justify-end">
               <Button onClick={() => window.location.href='/dashboard'}>Go to Dashboard</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};