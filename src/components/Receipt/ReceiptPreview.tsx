import { Transaction } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';

interface ReceiptPreviewProps {
  transaction: Transaction;
}

export const ReceiptPreview = ({ transaction }: ReceiptPreviewProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-[320px] mx-auto border border-slate-200">
      <div className="font-mono text-center space-y-4 text-slate-900">
        {/* Header */}
        <div className="border-b border-dashed border-slate-300 pb-4">
          <h2 className="font-bold text-lg uppercase">Retail Store LLC</h2>
          <p className="text-xs">123 Commerce Ave, Metropolis</p>
          <p className="text-xs">VAT: US-99887766</p>
        </div>

        {/* Details */}
        <div className="text-left text-sm space-y-1">
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}</span>
          </div>
          <div className="flex justify-between">
            <span>POS ID:</span>
            <span>{transaction.external_ref}</span>
          </div>
          {transaction.fiscal_code && (
            <div className="flex justify-between font-bold">
              <span>Fiscal ID:</span>
              <span>{transaction.fiscal_code}</span>
            </div>
          )}
        </div>

        {/* Items Placeholder */}
        <div className="border-y border-dashed border-slate-300 py-2 text-sm">
          <div className="flex justify-between">
            <span>General Items</span>
            <span>{formatCurrency(transaction.total_amount)}</span>
          </div>
        </div>

        {/* Totals */}
        <div className="text-right space-y-1">
          <div className="flex justify-between font-bold text-lg">
            <span>TOTAL</span>
            <span>{formatCurrency(transaction.total_amount)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>VAT (20%)</span>
            <span>{formatCurrency(transaction.tax_amount)}</span>
          </div>
        </div>

        {/* QR & Footer */}
        <div className="pt-4 flex flex-col items-center space-y-3">
          <QRCodeSVG value={transaction.qr_data} size={128} />
          <p className="text-xs text-slate-500 uppercase">Keep for tax purposes</p>
          {transaction.lottery_code && (
            <p className="text-sm font-bold border border-slate-900 px-2 py-1">
              LOTTERY: {transaction.lottery_code}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};