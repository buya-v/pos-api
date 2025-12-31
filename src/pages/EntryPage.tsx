import { useState } from 'react';
import { useFiscalStore } from '@/store/fiscalStore';
import { ReceiptPreview } from '@/components/Receipt/ReceiptPreview';
import { Transaction } from '@/types';
import { Printer, Loader2, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const EntryPage = () => {
  const { addTransaction } = useFiscalStore();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    setIsLoading(true);
    try {
      const tx = await addTransaction(val);
      setLastTransaction(tx);
      setAmount('');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Input Form */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manual Entry</h2>
          <p className="text-slate-500">Generate a fiscal receipt for a walk-in customer.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Total Amount (Includes VAT)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-xl font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-md text-sm text-slate-600">
            <div className="flex justify-between mb-1">
              <span>Net Amount:</span>
              <span>{amount ? formatCurrency(parseFloat(amount) / 1.2) : '$0.00'}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>VAT (20%):</span>
              <span>{amount ? formatCurrency(parseFloat(amount) - (parseFloat(amount) / 1.2)) : '$0.00'}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !amount}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-md"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing Fiscalization...</>
            ) : (
              <><ArrowRight className="w-5 h-5" /> Generate Receipt</>
            )}
          </button>
        </form>
      </div>

      {/* Receipt Output */}
      <div className="flex flex-col items-center justify-start space-y-6">
        <div className="w-full flex justify-between items-center">
           <h3 className="font-bold text-slate-700">Live Preview</h3>
           {lastTransaction && (
             <button 
                onClick={handlePrint}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
               <Printer className="w-4 h-4" /> Print Copy
             </button>
           )}
        </div>
        
        {lastTransaction ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <ReceiptPreview transaction={lastTransaction} />
          </div>
        ) : (
          <div className="w-full h-96 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
            <div className="text-center">
              <ReceiptPreview className="w-12 h-12 mx-auto mb-2 opacity-50" transaction={{} as any} /> {/* Hack for type, actually rendered hidden or icon */}
              <p>Receipt will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryPage;