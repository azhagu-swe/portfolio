import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

const SkipLink = styled(Link)(({ theme }) => ({
  position: 'fixed',
  top: -40,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  zIndex: 10000,
  textDecoration: 'none',
  borderRadius: '0 0 4px 4px',
  transition: 'top 0.3s',
  '&:focus': {
    top: 0,
  },
}));

const SkipNavigation: React.FC = () => {
  return (
    <SkipLink 
      href="#main-content" 
      aria-label="Skip to main content"
      underline="none"
    >
      Skip to main content
    </SkipLink>
  );
};

export default SkipNavigation;