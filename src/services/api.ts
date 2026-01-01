import { ApiError, FiscalStatus, Transaction, User } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    
    // P0: Specific Error Codes implementation
    if (email === 'fail@test.com') {
       throw {
         code: 'ERR_AUTH_CREDENTIALS_INVALID',
         message: 'Invalid email or password combination provided.',
         status: 401,
         timestamp: new Date().toISOString()
       } as ApiError;
    }

    if (email === 'timeout@test.com') {
      throw {
        code: 'ERR_GATEWAY_TIMEOUT',
        message: 'The fiscal authority gateway did not respond in time.',
        status: 504,
        timestamp: new Date().toISOString()
      } as ApiError;
    }

    // Success path
    if (password === 'password123') {
      return {
        id: 'usr_123',
        name: 'Demo Merchant',
        email,
        role: 'merchant',
        merchantId: 'mer_999'
      };
    }

    throw {
      code: 'ERR_AUTH_CREDENTIALS_INVALID',
      message: 'Invalid credentials.',
      status: 401,
      timestamp: new Date().toISOString()
    } as ApiError;
  },

  getFiscalStatus: async (): Promise<FiscalStatus> => {
    await delay(600);
    return {
      isConnected: true,
      lastSync: new Date().toISOString(),
      pendingTransactions: 0,
      fiscalId: 'FISCAL-777-888',
      status: 'healthy'
    };
  },

  getTransactions: async (): Promise<Transaction[]> => {
    await delay(500);
    return [
      {
        id: 'txn_001',
        amount: 150.00,
        vat: 30.00,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        qrCode: 'mock_qr_data',
        status: 'synced'
      },
      {
        id: 'txn_002',
        amount: 45.50,
        vat: 9.10,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        qrCode: 'mock_qr_data',
        status: 'synced'
      },
      {
        id: 'txn_003',
        amount: 210.00,
        vat: 42.00,
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        qrCode: 'mock_qr_data',
        status: 'pending'
      }
    ];
  }
};