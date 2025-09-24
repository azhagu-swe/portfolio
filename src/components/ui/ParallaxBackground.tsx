import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.3,
  className = '',
  style = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const yPos = useParallax(ref, { speed });

  return (
    <Box
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(0, ${yPos}px, 0)`,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {children}
    </Box>
  );
};

export default ParallaxBackground;