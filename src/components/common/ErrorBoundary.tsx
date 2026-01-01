import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  traceId: string | null;
}

// P0 Requirement: Global Error Boundary with Trace IDs
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, traceId: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, traceId: uuidv4() };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, send this to ELK/Sentry
    console.error("Uncaught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-base flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg border-l-4 border-danger">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-danger mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Application Error</h2>
            </div>
            <p className="text-gray-600 mb-4">
              An unexpected issue has occurred. Please contact support with the Trace ID below.
            </p>
            
            <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-4 border border-gray-200">
              <p className="font-bold text-gray-700">Trace ID:</p>
              <p className="text-danger break-all">{this.state.traceId}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded text-xs text-gray-500 mb-4 overflow-auto max-h-32">
               {this.state.error?.message}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}