import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import { useTouchDevice } from '@/hooks/useTouchDevice';

const SkipLink = styled(Link)(({ theme }) => {
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  return {
    position: 'fixed',
    top: -40,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(isTouchDevice ? 1.5 : 1, isTouchDevice ? 3 : 2),
    zIndex: 10000,
    textDecoration: 'none',
    borderRadius: '0 0 4px 4px',
    transition: 'top 0.3s',
    fontSize: isTouchDevice ? '1rem' : '0.875rem',
    fontWeight: 'bold',
    minWidth: isTouchDevice ? 44 : 'auto',
    minHeight: isTouchDevice ? 44 : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus': {
      top: 0,
    },
  };
});

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