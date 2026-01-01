export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  correlationId: string;
  timestamp: string;
  stackTrace?: string; // Only for internal logs, simplified for this demo
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  items: { name: string; price: number; vatRate: number }[];
  qrCodeUrl?: string;
  fiscalCode?: string;
}

export type ServiceStatus = 'operational' | 'degraded' | 'down';

export interface HealthCheck {
  service: 'API_GATEWAY' | 'DB_CONNECTION' | 'TAX_AUTHORITY' | 'VAULT';
  status: ServiceStatus;
  latencyMs: number;
  lastChecked: string;
}