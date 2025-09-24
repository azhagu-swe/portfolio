import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/styles/theme';
import ContactPage from '../index';

// Mock the CONTACT_DATA
jest.mock('@/utils/contactData', () => ({
  CONTACT_DATA: {
    title: "Get In Touch",
    subtitle: "Let's Connect",
    description: "I'm currently available for freelance opportunities, consulting projects, or full-time roles. Whether you have a question, want to work together, or just want to say hi, feel free to reach out!",
    form: {
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      methodLabel: "Contact Method",
      methods: [
        { value: "Email", label: "Email" },
      ],
      submitText: "Send Message",
    },
    socialLinks: [
      {
        platform: "Email",
        icon: "mdi:email-outline",
        link: "mailto:azhagu.swe@gmail.com",
        username: "azhagu.swe@gmail.com",
        color: "#D44638",
      },
      {
        platform: "LinkedIn",
        icon: "mdi:linkedin",
        link: "https://www.linkedin.com/in/azhagu-swe/",
        username: "@azhagu-swe",
        color: "#0077B5",
      },
    ],
  },
}));

describe('ContactPage', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={lightTheme}>
        {component}
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      writable: true,
      value: jest.fn(),
    });
  });

  it('renders the contact page with all elements', () => {
    renderWithTheme(<ContactPage />);
    
    // Check if the main title is present
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    
    // Check if the subtitle is present
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    
    // Check if the description is present
    expect(screen.getByText(
      "I'm currently available for freelance opportunities, consulting projects, or full-time roles. Whether you have a question, want to work together, or just want to say hi, feel free to reach out!"
    )).toBeInTheDocument();
    
    // Check if the form elements are present
    expect(screen.getByLabelText(/Your Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
    
    // Check if contact information section exists
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    
    // Check if social links are present
    expect(screen.getByText('Follow Me')).toBeInTheDocument();
    
    // Check that social media links appear
    const emailLinks = screen.getAllByText('Email');
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('validates form inputs correctly', async () => {
    renderWithTheme(<ContactPage />);
    
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    
    // Check for validation errors - use findByText to wait for them to appear
    await expect(screen.findByText('Please enter your name')).resolves.toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Please enter your message')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    renderWithTheme(<ContactPage />);
    
    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Your Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Your Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your Message/), { target: { value: 'Hello, I would like to connect!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    
    // Wait for the function to be called
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining('mailto:azhagu.swe@gmail.com'),
        '_blank'
      );
    });
  });

  it('clears validation errors when user starts typing', async () => {
    renderWithTheme(<ContactPage />);
    
    // Submit the form without filling in any fields to trigger errors
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    
    // Wait for the error to appear
    await expect(screen.findByText('Please enter your name')).resolves.toBeInTheDocument();
    
    // Start typing in the name field
    fireEvent.change(screen.getByLabelText(/Your Name/), { target: { value: 'John' } });
    
    // Wait for the error message to disappear
    await waitFor(() => {
      expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
    });
  });
});