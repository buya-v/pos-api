// Core Types based on Tech Specs

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'merchant' | 'viewer';
}

export interface Merchant {
  id: string;
  legalName: string;
  tradeName: string;
  address: string;
  vatNumber: string;
  status: 'active' | 'pending' | 'suspended';
  apiKey?: string;
  apiSecret?: string;
}

export interface Receipt {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  timestamp: string;
  items: { name: string; qty: number; price: number }[];
  status: 'synced' | 'pending' | 'voided';
  fiscalSignature: string;
  qrCodeUrl: string;
}

export interface ApiError {
  errorCode: string;
  message: string;
  correlationId: string;
  timestamp: string;
  path: string;
}

export interface OnboardingState {
  step: number;
  legalName: string;
  tradeName: string;
  address: string;
  vatNumber: string;
  isValidating: boolean;
  validationError: ApiError | null;
  generatedCredentials: { clientId: string; clientSecret: string } | null;
}