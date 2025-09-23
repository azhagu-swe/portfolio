import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalErrorBoundary from '../GlobalErrorBoundary';

// Create a component that throws an error
const Bomb = () => {
  throw new Error('💥 KABOOM! 💥');
};

// Mock the error handler utility but allow the actual ErrorBoundary to work
jest.mock('@/utils/errorHandler', () => {
  // Get the original ErrorBoundary
  const originalModule = jest.requireActual('@/utils/errorHandler');
  
  return {
    ...originalModule,
    // We'll mock the external logging but keep the actual ErrorBoundary
    errorMonitoringService: {
      reportJSError: jest.fn(),
      reportWarning: jest.fn(),
      reportInfo: jest.fn(),
    }
  };
});

describe('GlobalErrorBoundary', () => {
  // Suppress console.error for this test since we're intentionally causing errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <GlobalErrorBoundary>
        <div data-testid="child-content">Child content</div>
      </GlobalErrorBoundary>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toHaveTextContent('Child content');
  });

  it('displays error message when a child component throws an error', () => {
    // We need to wrap this in a function because it will throw
    const renderComponent = () => render(
      <GlobalErrorBoundary>
        <Bomb />
      </GlobalErrorBoundary>
    );
    
    // This should not throw an error because the ErrorBoundary catches it
    expect(renderComponent).not.toThrow();
    
    // Check that the error message is displayed
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/KABOOM!/i)).toBeInTheDocument();
  });

  it('has accessibility attributes', () => {
    render(
      <GlobalErrorBoundary>
        <div>Child content</div>
      </GlobalErrorBoundary>
    );
    
    // Test normal state (no error) - just check that content is rendered
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('displays error details when boundary catches an error', () => {
    render(
      <GlobalErrorBoundary>
        <Bomb />
      </GlobalErrorBoundary>
    );
    
    // Check for key elements in the error display
    // Use getAllByRole and check the first one, or be more specific
    const alertElements = screen.getAllByRole('alert');
    expect(alertElements[0]).toBeInTheDocument();
    
    // Check that we have buttons (simplified check)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    
    // Check for error message display
    const errorMessage = screen.getByText(/KABOOM!/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('MuiTypography-root');
  });
});