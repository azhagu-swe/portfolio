import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonWithHoverProps extends ButtonProps {
  hoverEffect?: 'scale' | 'shadow' | 'glow' | 'none';
}

const ButtonWithHover: React.FC<ButtonWithHoverProps> = ({
  children,
  className,
  hoverEffect = 'scale',
  ...props
}) => {

  const getHoverClass = () => {
    switch (hoverEffect) {
      case 'scale':
        return "hover:scale-105 transition-transform duration-300";
      case 'shadow':
        return "hover:-translate-y-1 hover:shadow-lg transition-all duration-300";
      case 'glow':
        return "hover:shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-shadow duration-300";
      default:
        return "";
    }
  };

  return (
    <Button
      className={cn(getHoverClass(), className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonWithHover;