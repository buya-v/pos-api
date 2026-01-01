import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../types';

// P0 Requirement: Diagnostic Trace IDs and Deep Trace Observability

export const generateTraceId = (): string => uuidv4();

export const createFiscalError = (message: string, context: string, existingTraceId?: string): ApiError => {
  const traceId = existingTraceId || generateTraceId();
  
  // In a real app, this would stream to ELK/Datadog
  console.error(`[FISCAL_ERROR] TraceID: ${traceId} | Message: ${message} | Context: ${context}`);
  
  return {
    error: message,
    code: 'FIS-001',
    traceId,
    context
  };
};

export const logInfo = (message: string, meta: Record<string, unknown> = {}) => {
    console.log(`[INFO] ${message}`, meta);
};