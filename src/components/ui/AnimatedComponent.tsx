import React, { useRef } from 'react';
import { useOnScreen } from '@/hooks/useOnScreen';
import { Box, BoxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AnimatedComponentProps extends BoxProps {
  children: React.ReactNode;
  animationType?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  animationType = 'fade-in',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  sx = {},
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, { threshold });
  const theme = useTheme();

  // Define animation styles based on type
  const getAnimationSx = () => {
    const baseSx = {
      transition: `all ${duration}ms ease-out`,
      transform: 'translate3d(0, 0, 0)', // Enable hardware acceleration
      ...sx,
    };

    switch (animationType) {
      case 'fade-in':
        return {
          ...baseSx,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)', // Using pixels instead of tailwind classes
        };
      case 'slide-up':
        return {
          ...baseSx,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        };
      case 'slide-down':
        return {
          ...baseSx,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-32px)',
        };
      case 'slide-left':
        return {
          ...baseSx,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-32px)',
        };
      case 'slide-right':
        return {
          ...baseSx,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(32px)',
        };
      default:
        return {
          ...baseSx,
          opacity: isVisible ? 1 : 0,
        };
    }
  };

  // Apply delay if specified
  const animationSx = {
    ...getAnimationSx(),
    transitionDelay: delay ? `${delay}ms` : '0ms',
  };

  return (
    <Box
      ref={ref}
      sx={animationSx}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedComponent;