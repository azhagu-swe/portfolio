
import React from 'react';
import { errorMonitoringService as externalErrorMonitoringService } from '@/services/errorMonitoring';

export interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: number;
  url?: string;
  userAgent?: string;
  userId?: string;
}

export interface ErrorMonitoringService {
  logError(error: Error, context?: Record<string, any>): void;
  logWarning(message: string, context?: Record<string, any>): void;
  logInfo(message: string, context?: Record<string, any>): void;
  reportJSError?(error: Error, context?: Record<string, any>): void;
  reportWarning?(message: string, context?: Record<string, any>): void;
  reportInfo?(message: string, context?: Record<string, any>): void;
}

class ConsoleErrorMonitoring implements ErrorMonitoringService {
  logError(error: Error, context?: Record<string, any>): void {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      ...context
    };

    console.error('Application Error:', errorLog);

    // Send to our enhanced error monitoring service
    externalErrorMonitoringService.reportJSError(error, context);
  }

  logWarning(message: string, context?: Record<string, any>): void {
    const warningLog = {
      message,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      ...context
    };

    console.warn('Application Warning:', warningLog);

    // Send to our enhanced error monitoring service
    externalErrorMonitoringService.reportWarning(message, context);
  }

  logInfo(message: string, context?: Record<string, any>): void {
    const infoLog = {
      message,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      ...context
    };

    console.info('Application Info:', infoLog);

    // Send to our enhanced error monitoring service
    externalErrorMonitoringService.reportInfo(message, context);
  }
}

// Singleton instance
const errorMonitoringService: ErrorMonitoringService = new ConsoleErrorMonitoring();

// Wrapper functions for easy usage
export const logError = (error: Error, context?: Record<string, any>): void => {
  errorMonitoringService.logError(error, context);
};

export const logWarning = (message: string, context?: Record<string, any>): void => {
  errorMonitoringService.logWarning(message, context);
};

export const logInfo = (message: string, context?: Record<string, any>): void => {
  errorMonitoringService.logInfo(message, context);
};

// Global error handler
export const setupGlobalErrorHandlers = (): void => {
  if (typeof window !== 'undefined') {
    // Handle uncaught JavaScript errors
    window.addEventListener('error', (event: ErrorEvent) => {
      logError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      logError(event.reason, {
        promise: event.promise
      });
    });
  }
};

// Error boundary component for React
export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}, {
  hasError: boolean;
  error: Error | null;
}> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return React.createElement(FallbackComponent, {
          error: this.state.error as Error,
          reset: this.resetError
        });
      }
      // Use Material-UI components instead of Tailwind classes
      return React.createElement(
        'div',
        { style: { padding: '16px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px' } },
        React.createElement(
          'h2',
          { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#991B1B', marginBottom: '8px' } },
          'Something went wrong'
        ),
        React.createElement(
          'p',
          { style: { color: '#B91C1C', marginBottom: '16px' } },
          this.state.error?.message
        ),
        React.createElement(
          'button',
          {
            onClick: this.resetError,
            style: { 
              padding: '8px 16px', 
              backgroundColor: '#DC2626', 
              color: 'white', 
              borderRadius: '4px', 
              border: 'none',
              cursor: 'pointer'
            }
          },
          'Try again'
        )
      );
    }

    return this.props.children;
  }
}

export default errorMonitoringService;