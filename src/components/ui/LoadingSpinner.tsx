import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

interface LoadingSpinnerProps {
  size?: number;
  thickness?: number;
  message?: string;
  variant?: 'circular' | 'linear';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 60, 
  thickness = 4, 
  message = 'Loading...',
  variant = 'circular'
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {variant === 'circular' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <CircularProgress 
            size={size} 
            thickness={thickness}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </motion.div>
      ) : (
        <Box sx={{ width: '100%', maxWidth: 300 }}>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0 }}
          >
            <CircularProgress 
              variant="determinate"
              value={25}
              size={size} 
              thickness={thickness}
              sx={{
                color: `${theme.palette.primary.main}40`,
                position: 'relative',
              }}
            />
            <CircularProgress 
              variant="indeterminate"
              disableShrink
              size={size} 
              thickness={thickness}
              sx={{
                color: theme.palette.primary.main,
                position: 'absolute',
                top: 0,
                left: 0,
                animationDuration: '1.5s',
              }}
            />
          </motion.div>
        </Box>
      )}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
          >
            {message}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default LoadingSpinner;