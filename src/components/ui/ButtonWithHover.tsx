import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ButtonWithHoverProps extends ButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  hoverEffect?: 'scale' | 'shadow' | 'glow' | 'none';
}

const ButtonWithHover: React.FC<ButtonWithHoverProps> = ({
  children,
  variant = 'contained',
  hoverEffect = 'scale',
  ...props
}) => {
  const theme = useTheme();
  
  // Define different hover effects
  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'scale':
        return {
          transform: 'scale(1.03)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        };
      case 'shadow':
        return {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`
          ,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        };
      case 'glow':
        return {
          boxShadow: `0 0 15px ${theme.palette.primary.main}`,
          transition: 'box-shadow 0.3s ease',
        };
      default:
        return {};
    }
  };

  const hoverStyles = getHoverStyles();
  
  // Combine custom hover effects with MUI Button styles
  const buttonSx = {
    ...props.sx,
    ...(hoverEffect !== 'none' && { 
      '&:hover': {
        ...hoverStyles,
        ...((props.sx as any)?.['&:hover'] || {})
      }
    }),
  };

  return (
    <Button
      variant={variant}
      sx={buttonSx}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonWithHover;