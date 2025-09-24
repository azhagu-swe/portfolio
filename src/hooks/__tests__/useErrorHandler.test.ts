import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '../useErrorHandler';

// Mock the error logging function
jest.mock('@/utils/errorHandler', () => {
  return {
    logError: jest.fn(),
  };
});

describe('useErrorHandler', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle an error correctly', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new Error('Test error');
    const context = { component: 'TestComponent' };
    
    act(() => {
      result.current.handleError(error, context);
    });
    
    expect(result.current.error).toBe(error);
  });

  it('should reset the error state', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new Error('Test error');
    
    act(() => {
      result.current.handleError(error);
    });
    
    expect(result.current.error).toBe(error);
    
    act(() => {
      result.current.resetError();
    });
    
    expect(result.current.error).toBeNull();
  });

  it('should handle async functions with error handling', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    const asyncFunction = async (value: number) => {
      if (value < 0) {
        throw new Error('Negative value');
      }
      return value * 2;
    };
    
    const wrappedFunction = result.current.withErrorHandling(asyncFunction);
    
    // Test successful execution
    await act(async () => {
      const successResult = await wrappedFunction(5);
      expect(successResult).toBe(10);
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    
    // Test error handling
    await act(async () => {
      await wrappedFunction(-1);
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
  });

  it('should handle non-Error objects in error handling', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    const asyncFunction = async () => {
      // Throw a string instead of an Error object
      throw 'String error';
    };
    
    const wrappedFunction = result.current.withErrorHandling(asyncFunction);
    
    await act(async () => {
      await wrappedFunction();
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toContain('Unknown error: String error');
  });
});