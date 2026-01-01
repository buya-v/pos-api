import { Rfc7807Error } from '../types';

// Simulation of Backend Logic including Loop Detection and Error Generation

const generateCorrelationId = () => `LOG-${Math.floor(Math.random() * 100000)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

export const mockApi = {
  checkHealth: async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Simulate random connectivity flip
    return Math.random() > 0.1;
  },

  signTransaction: async (amount: number): Promise<{ qrCode: string; code: string }> => {
    const startTime = performance.now();
    const delay = Math.floor(Math.random() * 800) + 200;
    await new Promise(resolve => setTimeout(resolve, delay));

    const success = Math.random() > 0.3; // 30% chance of failure to demonstrate error handling

    if (!success) {
      const correlationId = generateCorrelationId();
      const errorResponse: Rfc7807Error = {
        type: "https://pos-api.io/errors/fiscal-communication-failure",
        title: "Fiscal Device Unreachable",
        status: 500,
        detail: "Connection reset by peer at FiscalDriver.sys line 402",
        instance: "/v1/fiscal/sign",
        correlationId
      };
      throw errorResponse;
    }

    return {
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VAT-RECEIPT-VALID",
      code: `LOT-${Date.now()}`
    };
  }
};