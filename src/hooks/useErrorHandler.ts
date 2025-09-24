import { useState, useCallback } from 'react';
import { logError } from '@/utils/errorHandler';

interface UseErrorHandlerReturn {
  error: Error | null;
  isLoading: boolean;
  handleError: (error: Error, context?: Record<string, any>) => void;
  resetError: () => void;
  withErrorHandling: <T extends (...args: any[]) => Promise<any>>(
    asyncFunction: T,
    context?: Record<string, any>
  ) => (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined>;
}

/**
 * Custom hook for handling errors in components
 * @returns {UseErrorHandlerReturn} Object containing error state and helper functions
 */
export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle an error by logging it and setting the error state
   * @param {Error} error - The error to handle
   * @param {Record<string, any>} context - Additional context for the error
   */
  const handleError = useCallback((error: Error, context?: Record<string, any>) => {
    setError(error);
    logError(error, context);
  }, []);

  /**
   * Reset the error state
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Wrap an async function with error handling
   * @param {Function} asyncFunction - The async function to wrap
   * @param {Record<string, any>} context - Additional context for errors
   * @returns {Function} Wrapped function with error handling
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    asyncFunction: T,
    context?: Record<string, any>
  ) => {
    return async (...args: Parameters<T>) => {
      try {
        setIsLoading(true);
        const result = await asyncFunction(...args);
        setIsLoading(false);
        return result;
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Error) {
          handleError(err, context);
        } else {
          handleError(new Error(`Unknown error: ${err}`), context);
        }
      }
    };
  }, [handleError]);

  return {
    error,
    isLoading,
    handleError,
    resetError,
    withErrorHandling
  };
};