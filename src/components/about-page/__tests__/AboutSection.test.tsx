import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutSection from '../AboutSection';

describe('AboutSection', () => {
  it('renders without crashing', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('displays experience information', () => {
    render(<AboutSection />);
    expect(screen.getByText(/3 years of experience/i)).toBeInTheDocument();
  });
});