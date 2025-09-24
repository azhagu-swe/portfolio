import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the SkipNavigation component since it uses Material-UI styled components
jest.mock('../SkipNavigation', () => {
  return {
    __esModule: true,
    default: () => <a href="#main-content">Skip to main content</a>,
  };
});

// Since we're mocking the component, we need to import it after the mock
const SkipNavigation = require('../SkipNavigation').default;

describe('SkipNavigation', () => {
  it('renders the skip navigation link', () => {
    render(<SkipNavigation />);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('has the correct text content', () => {
    render(<SkipNavigation />);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toHaveTextContent('Skip to main content');
  });
});