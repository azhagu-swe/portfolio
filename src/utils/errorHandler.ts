
import React from 'react';

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

    // In production, you might send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: send to your error tracking service
      // sendToErrorTrackingService(errorLog);
    }
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
      return React.createElement(
        'div',
        { className: 'error-boundary p-4 bg-red-50 border border-red-200 rounded' },
        React.createElement(
          'h2',
          { className: 'text-xl font-bold text-red-800 mb-2' },
          'Something went wrong'
        ),
        React.createElement(
          'p',
          { className: 'text-red-600 mb-4' },
          this.state.error?.message
        ),
        React.createElement(
          'button',
          {
            onClick: this.resetError,
            className: 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
          },
          'Try again'
        )
      );
    }

    return this.props.children;
  }
}

export default errorMonitoringService;