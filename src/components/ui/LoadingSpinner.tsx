import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  message = 'Loading...',
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Loader2
          className="animate-spin text-primary"
          size={size}
        />
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;