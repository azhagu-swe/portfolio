// src/hooks/useErrorHandler.ts
import { useState, useCallback } from 'react';
import { logError } from '@/utils/errorHandler';

/**
 * Custom hook for handling errors in components
 */
export const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle an error by logging it and setting it in state
   */
  const handleError = useCallback((error: Error, context?: Record<string, any>) => {
    logError(error, context);
    setError(error);
    setIsLoading(false);
  }, []);

  /**
   * Reset the error state
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Wrap an async function with error handling
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    asyncFn: T
  ): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined>) => {
    return async (...args: Parameters<T>) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await asyncFn(...args);
        setIsLoading(false);
        return result;
      } catch (err) {
        handleError(err as Error);
        return undefined;
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