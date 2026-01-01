import { ProblemDetails, Transaction } from '../types';

export const generateUUID = () => crypto.randomUUID();

export const generateMockError = (status: number, title: string): ProblemDetails => ({
  type: `https://pos-api.io/errors/${status === 422 ? 'validation' : 'server-error'}`,
  title,
  status,
  detail: status === 422 
    ? 'The transaction amount cannot be negative.' 
    : 'Upstream tax authority service timeout.',
  instance: `/v1/transactions/${generateUUID()}`,
  correlationId: `req-${generateUUID().substring(0, 8)}`,
  timestamp: new Date().toISOString(),
  stackTrace: `Error: ${title}\n    at FiscalValidator.validate (/src/core/fiscal.ts:42:12)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)`
});

export const generateTransaction = (amount: number): Transaction => ({
  id: `tx_${generateUUID().substring(0, 8)}`,
  amount,
  currency: 'EUR',
  status: 'completed',
  timestamp: new Date().toISOString(),
  items: [{ name: 'Manual Entry', price: amount, vatRate: 0.2 }],
  fiscalCode: `FISC-${Math.floor(Math.random() * 999999)}`,
  qrCodeUrl: '#'
});