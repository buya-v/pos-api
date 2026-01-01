import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-error" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Critical System Failure</h1>
            <p className="text-slate-600 mb-6">
              The application has encountered an unrecoverable state (Iter 7.1). 
              We have cleared the session storage to prevent loops.
            </p>
            <div className="bg-slate-100 p-3 rounded text-left text-xs font-mono text-slate-700 mb-6 overflow-auto max-h-32">
              {this.state.error?.toString()}
            </div>
            <Button onClick={this.handleReset} variant="primary" className="w-full">
              Hard Reset Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}