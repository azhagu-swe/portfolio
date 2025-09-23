// Error monitoring service for production environments

/**
 * Type definitions for error monitoring
 */
export interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: number;
  url?: string;
  userAgent?: string;
  userId?: string;
  componentStack?: string;
  context?: Record<string, any>;
  level: 'error' | 'warning' | 'info';
}

/**
 * Error monitoring service class
 */
class ErrorMonitoringService {
  private isInitialized: boolean = false;
  private projectId?: string;
  private apiUrl?: string;

  /**
   * Initialize the error monitoring service
   * @param {string} projectId - The project ID for error tracking
   * @param {string} apiUrl - The API URL for sending error reports
   */
  public initialize(projectId?: string, apiUrl?: string): void {
    this.projectId = projectId;
    this.apiUrl = apiUrl;
    this.isInitialized = true;
  }

  /**
   * Report an error to the monitoring service
   * @param {ErrorReport} errorReport - The error report to send
   */
  public async reportError(errorReport: ErrorReport): Promise<void> {
    // In development, just log to console
    if (process.env.NODE_ENV === 'development') {
      // Using console.log for development debugging is acceptable
      console.log('[Error Monitoring] Error report:', errorReport);
      return;
    }

    // In production, send to external service
    if (process.env.NODE_ENV === 'production' && this.isInitialized) {
      try {
        // Send to custom API endpoint
        if (this.apiUrl) {
          await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...errorReport,
              projectId: this.projectId,
            }),
          });
        }
        
        // Also send to Sentry if available
        if (typeof window !== 'undefined' && (window as any).Sentry) {
          (window as any).Sentry.captureMessage(errorReport.message, {
            level: errorReport.level,
            contexts: {
              report: errorReport
            }
          });
        }
      } catch (err) {
        // If logging fails, we don't want to create another error
        console.error('Failed to send error to external service:', err);
      }
    }
  }

  /**
   * Report a JavaScript error
   * @param {Error} error - The error to report
   * @param {Record<string, any>} context - Additional context
   */
  public reportJSError(error: Error, context?: Record<string, any>): void {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      level: 'error',
      context
    };

    this.reportError(errorReport);
  }

  /**
   * Report a warning
   * @param {string} message - The warning message
   * @param {Record<string, any>} context - Additional context
   */
  public reportWarning(message: string, context?: Record<string, any>): void {
    const errorReport: ErrorReport = {
      message,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      level: 'warning',
      context
    };

    this.reportError(errorReport);
  }

  /**
   * Report an info message
   * @param {string} message - The info message
   * @param {Record<string, any>} context - Additional context
   */
  public reportInfo(message: string, context?: Record<string, any>): void {
    const errorReport: ErrorReport = {
      message,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      level: 'info',
      context
    };

    this.reportError(errorReport);
  }
}

// Export singleton instance
export const errorMonitoringService = new ErrorMonitoringService();

// Initialize in production if environment variables are available
if (process.env.NODE_ENV === 'production') {
  errorMonitoringService.initialize(
    process.env.NEXT_PUBLIC_PROJECT_ID,
    process.env.NEXT_PUBLIC_ERROR_MONITORING_API
  );
}