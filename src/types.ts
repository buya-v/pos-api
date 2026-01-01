export interface Rfc7807Error {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance: string;
  correlationId: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  status: number;
  correlationId?: string;
  durationMs: number;
  detail?: string;
}

export interface FiscalStatus {
  isConnected: boolean;
  lastChecked: string;
}