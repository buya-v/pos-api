import { ApiError } from '../types';

// Simulate API Latency and Standardized Error Responses
export const simulateApiCall = async <T>(success: boolean, data: T, failureReason?: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        const errorResponse: ApiError = {
          errorCode: failureReason === 'network' ? 'ERR_FISCAL_SYNC_TIMEOUT' : 'ERR_VALIDATION_FAILED',
          message: failureReason === 'network' ? 'The tax authority server is not responding.' : 'The provided VAT number format is invalid.',
          correlationId: `req-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          path: '/api/v1/simulated-endpoint'
        };
        reject(errorResponse);
      }
    }, 1200);
  });
};

export const validateVat = async (vat: string): Promise<boolean> => {
  // Simulate 3rd party check. Only accept VAT starting with "DE"
  if (!vat.startsWith("DE")) {
    await simulateApiCall(false, null, 'validation');
    return false;
  }
  return await simulateApiCall(true, true);
};