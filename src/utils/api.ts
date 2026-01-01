import { Transaction, ApiError } from '../types';
import { createFiscalError } from './logger';
import { v4 as uuidv4 } from 'uuid';

// Mock API Service simulating external fiscal hardware/servers
export const fiscalizeTransaction = async (amount: number, merchantId: string): Promise<Transaction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      
      // Simulate Critical "Unknown Issue" loop (approx 20% fail rate for demo)
      if (random < 0.2) {
        const error: ApiError = createFiscalError(
          'Fiscal Service Timeout',
          'Communication with hardware timed out after 5000ms'
        );
        reject(error);
        return;
      }

      const newTx: Transaction = {
        id: `tx_${uuidv4().slice(0, 8)}`,
        merchantId,
        amount,
        currency: 'USD',
        timestamp: new Date().toISOString(),
        status: 'success',
        items: [{ name: 'Manual Entry Item', price: amount, quantity: 1 }]
      };

      resolve(newTx);
    }, 1500);
  });
};