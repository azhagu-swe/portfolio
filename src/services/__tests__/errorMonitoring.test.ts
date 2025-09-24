import { errorMonitoringService, ErrorReport } from '../errorMonitoring';

describe('ErrorMonitoringService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    // Reset the service state
    const service = new (errorMonitoringService.constructor as any)();
    expect(service.isInitialized).toBe(false);
    expect(service.projectId).toBeUndefined();
    expect(service.apiUrl).toBeUndefined();
  });

  it('should initialize with provided values', () => {
    const service = new (errorMonitoringService.constructor as any)();
    service.initialize('test-project-id', 'https://api.example.com/errors');
    
    expect(service.isInitialized).toBe(true);
    expect(service.projectId).toBe('test-project-id');
    expect(service.apiUrl).toBe('https://api.example.com/errors');
  });

  it('should log error reports in development', () => {
    // Mock NODE_ENV
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    const errorReport: ErrorReport = {
      message: 'Test error',
      timestamp: Date.now(),
      level: 'error'
    };
    
    errorMonitoringService.reportError(errorReport);
    
    expect(consoleLogSpy).toHaveBeenCalledWith('[Error Monitoring] Error report:', errorReport);
    
    // Restore
    consoleLogSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it('should handle JavaScript errors', () => {
    const error = new Error('Test JavaScript error');
    const context = { component: 'TestComponent' };
    
    // Mock the reportError method
    const reportErrorSpy = jest.spyOn(errorMonitoringService as any, 'reportError').mockImplementation();
    
    errorMonitoringService.reportJSError(error, context);
    
    expect(reportErrorSpy).toHaveBeenCalled();
    const callArgs = reportErrorSpy.mock.calls[0][0];
    expect(callArgs.message).toBe('Test JavaScript error');
    expect(callArgs.stack).toBe(error.stack);
    expect(callArgs.level).toBe('error');
    expect(callArgs.context).toEqual(context);
    expect(typeof callArgs.timestamp).toBe('number');
    
    reportErrorSpy.mockRestore();
  });

  it('should handle warnings', () => {
    const message = 'Test warning message';
    const context = { component: 'TestComponent' };
    
    // Mock the reportError method
    const reportErrorSpy = jest.spyOn(errorMonitoringService as any, 'reportError').mockImplementation();
    
    errorMonitoringService.reportWarning(message, context);
    
    expect(reportErrorSpy).toHaveBeenCalled();
    const callArgs = reportErrorSpy.mock.calls[0][0];
    expect(callArgs.message).toBe('Test warning message');
    expect(callArgs.level).toBe('warning');
    expect(callArgs.context).toEqual(context);
    expect(typeof callArgs.timestamp).toBe('number');
    
    reportErrorSpy.mockRestore();
  });

  it('should handle info messages', () => {
    const message = 'Test info message';
    const context = { component: 'TestComponent' };
    
    // Mock the reportError method
    const reportErrorSpy = jest.spyOn(errorMonitoringService as any, 'reportError').mockImplementation();
    
    errorMonitoringService.reportInfo(message, context);
    
    expect(reportErrorSpy).toHaveBeenCalled();
    const callArgs = reportErrorSpy.mock.calls[0][0];
    expect(callArgs.message).toBe('Test info message');
    expect(callArgs.level).toBe('info');
    expect(callArgs.context).toEqual(context);
    expect(typeof callArgs.timestamp).toBe('number');
    
    reportErrorSpy.mockRestore();
  });
});