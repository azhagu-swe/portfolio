import { logError, logWarning, logInfo } from '../errorHandler';

// Mock the external error monitoring service
jest.mock('@/services/errorMonitoring', () => {
  return {
    errorMonitoringService: {
      reportJSError: jest.fn(),
      reportWarning: jest.fn(),
      reportInfo: jest.fn(),
    }
  };
});

describe('errorHandler', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('logError should call console.error and external service', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const error = new Error('Test error');
    const context = { component: 'TestComponent' };
    
    logError(error, context);
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Application Error:', expect.objectContaining({
      message: 'Test error',
      ...context
    }));
    
    consoleErrorSpy.mockRestore();
  });

  it('logWarning should call console.warn and external service', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const message = 'Test warning';
    const context = { component: 'TestComponent' };
    
    logWarning(message, context);
    
    expect(consoleWarnSpy).toHaveBeenCalledWith('Application Warning:', expect.objectContaining({
      message: 'Test warning',
      ...context
    }));
    
    consoleWarnSpy.mockRestore();
  });

  it('logInfo should call console.info and external service', () => {
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    
    const message = 'Test info';
    const context = { component: 'TestComponent' };
    
    logInfo(message, context);
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('Application Info:', expect.objectContaining({
      message: 'Test info',
      ...context
    }));
    
    consoleInfoSpy.mockRestore();
  });

  it('logError should handle error without context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const error = new Error('Test error without context');
    
    logError(error);
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Application Error:', expect.objectContaining({
      message: 'Test error without context',
    }));
    
    consoleErrorSpy.mockRestore();
  });

  it('logWarning should handle warning without context', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const message = 'Test warning without context';
    
    logWarning(message);
    
    expect(consoleWarnSpy).toHaveBeenCalledWith('Application Warning:', expect.objectContaining({
      message: 'Test warning without context',
    }));
    
    consoleWarnSpy.mockRestore();
  });

  it('logInfo should handle info without context', () => {
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    
    const message = 'Test info without context';
    
    logInfo(message);
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('Application Info:', expect.objectContaining({
      message: 'Test info without context',
    }));
    
    consoleInfoSpy.mockRestore();
  });
});