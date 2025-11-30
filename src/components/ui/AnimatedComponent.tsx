import React, { useRef } from 'react';
import { useOnScreen } from '@/hooks/useOnScreen';
import { cn } from '@/lib/utils';

interface AnimatedComponentProps extends React.HTMLAttributes<HTMLDivElement> {
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
  className,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, { threshold });

  // Define animation styles based on type
  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transition: `all ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
      opacity: isVisible ? 1 : 0,
    };

    switch (animationType) {
      case 'fade-in':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        };
      case 'slide-up':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        };
      case 'slide-down':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(-32px)',
        };
      case 'slide-left':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateX(0)' : 'translateX(-32px)',
        };
      case 'slide-right':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateX(0)' : 'translateX(32px)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ ...style, ...getAnimationStyles() }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;